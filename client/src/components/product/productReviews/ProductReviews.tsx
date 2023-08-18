import React, { FC, FormEvent, useEffect, useMemo, useState } from 'react';
import styles from "./productReviews.module.css";
import { Row, Col, FloatingLabel, Form, Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import cn from "classnames";
import {
  errorReviewsByProductSelector,
  loadedReviewsByProductSelector,
  loadingReviewsByProductSelector,
  ratingSelector,
  reviewsByProductSelector
} from "../../../redux/selectors";
import { loadReviews } from "../../../redux/actions";
import { connect, ConnectedProps } from "react-redux";
import Rate from "../../rate/Rate";
import useForm from "../../../hooks/use-form";
import { createReview } from "../../../redux/actions";
import { REVIEW_FIELDS } from "../../../utils/consts";
import Loader from "../../loader";
import Checkbox from "../../checkbox";
import { RootStateType } from '../../../redux/store';
import { Dispatch } from 'redux';

interface IOwnProps {
  productId: string
}

type IProps = IOwnProps & PropsFromRedux

const ProductReviews: FC<IProps> = ({
  productId,
  loadReviews,
  loading,
  loaded,
  reviews,
  rating,
  createReview,
  errors
}) => {
  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  const initialValues = useMemo(
    () => REVIEW_FIELDS.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {}),
    [REVIEW_FIELDS]
  );
  const [displayAll, setDisplayAll] = useState(false);
  const [recommended, setRecommended] = useState(false);
  const [validated, setValidated] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { values, handlers, reset } = useForm({ ...initialValues, rating: 3 });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (e.currentTarget.checkValidity()) {
      setUploading(true);

      await new Promise(resolve => {
        setTimeout(() => {
          createReview(
            {
              ...values,
              recommended,
              id: Date.now().toString(),
              date: new Date().toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
              }),
            }
          );

          resolve(null);
        }, 3000);
      }
      );

      setUploading(false);
      setRecommended(false);
      setValidated(false);
      reset();
      return;
    }

    setValidated(true);
  };

  if (loading) return <Loader />;

  if (errors) return (
    <>
      {
        errors.map((err, i) => (
          <Alert variant="danger" key={i}>{err}</Alert>
        ))
      }
    </>
  );

  if (!loaded) return null;

  const storageReviews = JSON.parse(localStorage.getItem('addedReviews') || '{}');
  const defaultDisplayCount = 3;

  return (
    <div className={styles.main}>
      <Row>
        <Col lg={6}>
          {
            !!reviews.length &&
            <div className={styles.overall}>
              <div className={styles.overallTitle}>Overall Customer Rating:</div>
              <div className={styles.overallRating}>
                <div className={styles.overallStars}>
                  <Rate value={rating.overall} />
                </div>
                <div className={styles.overallCount}>{rating.overall}</div>
              </div>
              <div className={styles.overallSubtitle}>Based on {reviews.length} Reviews</div>
              <div className={styles.overallText}>{rating.recommendedShare()}% of customers would recommend this product
                to a friend ({rating.recommendedLength} out of {reviews.length})
              </div>
            </div>
          }

          <div className={styles.form}>
            {
              storageReviews?.[productId]
                ?
                <div className={styles.formSuccessTitle}>You have already left a review for this product...</div>
                :
                <>
                  <div className={styles.formTitle}>Write Your Review:</div>
                  <div className={styles.formRating}>
                    <span className={styles.formRatingCaption}>Rating:</span>
                    <span className={styles.formStars}>
                      <Rate {...handlers.rating} disabled={uploading} />
                    </span>
                  </div>
                  <Form onSubmit={handleSubmit} noValidate validated={validated}>
                    {
                      REVIEW_FIELDS.map(field => {
                        const { id, label, ...rest } = field;
                        return (
                          <FloatingLabel key={id} controlId={id} label={label}>
                            {/* @ts-expect-error */}
                            <Form.Control disabled={uploading}
                              {...rest}
                              {...handlers[id]}
                            />
                            <Form.Control.Feedback type="invalid">
                              Field must not be empty
                            </Form.Control.Feedback>
                          </FloatingLabel>
                        )
                      })
                    }
                    <Checkbox id="recommended" active={recommended} disabled={uploading} handleChange={() => setRecommended(!recommended)}>
                      I would recommend this to a friend!
                    </Checkbox>
                    <Button className={cn('c-button', styles.submitButton)} disabled={uploading} type='submit'>
                      {
                        uploading &&
                        <Loader />
                      }
                      Submit Review
                    </Button>
                  </Form>
                </>
            }
          </div>
        </Col>

        <Col lg={6}>
          {
            !!reviews.length
              ? <>
                <div>
                  {
                    reviews.slice(0, (displayAll ? reviews.length : defaultDisplayCount)).map(review => {
                      const { id, rating, name, title, text } = review;
                      const date = new Date(review.date).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'long', day: 'numeric'
                      });

                      return (
                        <div className={styles.item} key={id}>
                          <div className={styles.itemStars}>
                            <Rate value={rating} />
                          </div>
                          <div className={styles.itemDate}>{date}</div>
                          <div className={styles.itemName}>{name}</div>
                          <div className={styles.itemTitle}>{title}</div>
                          <div className={styles.itemText}>{text}</div>
                        </div>
                      )
                    })
                  }
                </div>
                {
                  !displayAll && reviews.length > defaultDisplayCount &&
                  /* @ts-expect-error */
                  <Button className={cn('c-button', styles.moreButton)} onClick={setDisplayAll}>Load More Reviews</Button>
                }
              </>
              : <div>There are no reviews for this product yet.</div>
          }
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = (state: RootStateType, props: IOwnProps) => ({
  reviews: reviewsByProductSelector(state, props.productId),
  loading: loadingReviewsByProductSelector(state, props),
  loaded: loadedReviewsByProductSelector(state, props),
  rating: ratingSelector(state, props.productId),
  errors: errorReviewsByProductSelector(state, props)
})

const mapDispatchToProps = (dispatch: Dispatch, props: IOwnProps) => ({
  /* @ts-expect-error */
  loadReviews: () => dispatch(loadReviews(props.productId)),
  /* @ts-expect-error */
  createReview: (values: Record<string, any>) => dispatch(createReview(values, props.productId))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(ProductReviews);
