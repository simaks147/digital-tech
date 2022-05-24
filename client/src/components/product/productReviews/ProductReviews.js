import React, {useEffect, useState} from 'react';
import styles from "./productReviews.module.css";
import {Row, Col, FloatingLabel, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import cn from "classnames";
import {
  loadedReviewsByProductSelector,
  loadingReviewsByProductSelector,
  ratingSelector,
  reviewsByProductSelector
} from "../../../redux/selectors";
import {loadReviews} from "../../../redux/actions";
import {connect} from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import Rate from "../../rate/Rate";
import useForm from "../../../hooks/use-form";
import {addReview} from "../../../redux/actions";
import {REVIEW_FIELDS} from "../../../utils/consts";

const initialValues = {
  name: '',
  title: '',
  text: '',
  rating: 3,
};

const ProductReviews = ({slug, loadReviews, loading, loaded, reviews, rating, addReview}) => {
  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  const [displayAll, setDisplayAll] = useState(false);
  const [recommended, setRecommended] = useState(false);
  const [validated, setValidated] = useState(false);
  const {values, handlers, reset} = useForm(initialValues);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (e.currentTarget.checkValidity()) {
      addReview({
        id: Date.now().toString(),
        productId: slug,
        recommended,
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric', month: 'long', day: 'numeric'
        }),
        ...values,
      });

      setRecommended(false);
      setValidated(false);
      reset();
      return;
    }

    setValidated(true);
  };

  const addedReview = localStorage.getItem('addedReview');

  if (loading) return (
    <Spinner animation="border" role="status" className='c-loader'>
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  )

  if (!loaded) return 'Error!!!';

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
                  <Rate value={rating.overall}/>
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
              addedReview
                ?
                <div className={styles.formSuccessTitle}>You have already left a review for this product...</div>
                :
                <>
                  <div className={styles.formTitle}>Write Your Review:</div>
                  <div className={styles.formRating}>
                    <span className={styles.formRatingCaption}>Rating:</span>
                    <span className={styles.formStars}>
                      <Rate {...handlers.rating}/>
                    </span>
                  </div>
                  <Form onSubmit={handleSubmit} noValidate validated={validated}>
                    {
                      REVIEW_FIELDS.map(field => {
                        const {id, label, type, as, name, placeholder, required} = field;
                        return (
                          <FloatingLabel key={id} controlId={id} label={label}>
                            <Form.Control type={type}
                                          as={as}
                                          name={name}
                                          placeholder={placeholder}
                                          required={required}
                                          {...handlers[name]}
                            />
                            <Form.Control.Feedback type="invalid">
                              Field must not be empty
                            </Form.Control.Feedback>
                          </FloatingLabel>
                        )
                      })
                    }
                    <Form.Check id="recommended" className={cn(styles.formRecommended, {active: recommended})}>
                      <Form.Check.Input type={'checkbox'} className={styles.formRecommendedInput}
                                        onChange={() => setRecommended(!recommended)} checked={recommended}/>
                      <Form.Check.Label className={styles.formRecommendedLabel}>I would recommend this to a
                        friend!</Form.Check.Label>
                    </Form.Check>
                    <Button className={cn('c-button', styles.submitButton)} type='submit'>Submit Review</Button>
                  </Form>
                </>
            }
          </div>
        </Col>

        <Col lg={6}>
          {
            !!reviews.length
              ? <>
                <div className={styles.list}>
                  {
                    reviews.slice(0, (displayAll ? reviews.length : 3)).map(review => (
                      <div className={styles.item} key={review.id}>
                        <div className={styles.itemStars}>
                          <Rate value={review.rating}/>
                        </div>
                        <div className={styles.itemDate}>{review.date}</div>
                        <div className={styles.itemName}>{review.name}</div>
                        <div className={styles.itemTitle}>{review.title}</div>
                        <div className={styles.itemText}>{review.text}</div>
                      </div>
                    ))
                  }
                </div>
                {
                  !displayAll &&
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

const mapStateToProps = (state, props) => ({
  reviews: reviewsByProductSelector(state, props),
  loading: loadingReviewsByProductSelector(state, props),
  loaded: loadedReviewsByProductSelector(state, props),
  rating: ratingSelector(state, props)
})

const mapDispatchToProps = (dispatch, props) => ({
  loadReviews: () => dispatch(loadReviews(props.slug)),
  addReview: (values) => dispatch(addReview(props.slug, values))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductReviews);
