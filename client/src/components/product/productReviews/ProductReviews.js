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

const initialValues = {
  // name: '',
  // email: '',
  title: '',
  text: '',
  rating: 3,
};

const ProductReviews = ({slug, loadReviews, loading, loaded, reviews, rating, addReview}) => {
  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  const [lastVisibleReview, setLastVisibleReview] = useState(3);
  const [recommended, setRecommended] = useState(false);
  const {values, handlers, reset} = useForm(initialValues);

  const handleLastVisibleReview = () => setLastVisibleReview(reviews.length);
  const handleChangeRecommended = () => setRecommended(!recommended);
  const handleSubmit = (e) => {
    e.preventDefault();
    reset();
    addReview({
      id: '1_10',
      userId: '10',
      productId: slug,
      recommended,
      date: 'September, 24 2016',
      ...values,
    });
  };

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
              <div className={styles.overallText}>{rating.recommendedShare()}% of customers would recommend this product to a friend ({rating.recommendedLength} out of {reviews.length})
              </div>
            </div>
          }

          <div className={styles.form}>
            <div className={styles.formTitle}>Write Your Review:</div>
            <div className={styles.formRating}>
              <span className={styles.formRatingCaption}>Rating:</span>
              <span className={styles.formStars}>
                <Rate {...handlers.rating}/>
              </span>
            </div>
            <Form>
              <FloatingLabel controlId="name" label="Your Name">
                <Form.Control type="text" name="name" placeholder="Your Name" {...handlers.name}/>
              </FloatingLabel>
              {/*<FloatingLabel controlId="email" label="Your E-mail">*/}
              {/*  <Form.Control type="email" name="email" placeholder="Your E-mail" {...handlers.email}/>*/}
              {/*</FloatingLabel>*/}
              <FloatingLabel controlId="title" label="Review Title">
                <Form.Control type="text" name="title" placeholder="Review Title" {...handlers.title}/>
              </FloatingLabel>
              <FloatingLabel controlId="text" label="Your Review">
                <Form.Control as="textarea" name="text" placeholder="Your Review"  {...handlers.text}/>
              </FloatingLabel>
              <Form.Check id="recommended" className={cn(styles.formRecommended, {active: recommended})}>
                <Form.Check.Input type={'checkbox'} className={styles.formRecommendedInput} onChange={handleChangeRecommended} checked={recommended}/>
                <Form.Check.Label className={styles.formRecommendedLabel}>I would recommend this to a
                  friend!</Form.Check.Label>
              </Form.Check>
              <Button className={cn('c-button', styles.submitButton)} onClick={handleSubmit}>Submit Review</Button>
            </Form>
          </div>
        </Col>

        <Col lg={6}>
          {
            !!reviews.length
              ? <>
                <div className={styles.list}>
                  {
                    reviews.slice(0, lastVisibleReview).map(review => (
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
                  (lastVisibleReview < reviews.length) &&
                    <Button className={cn('c-button', styles.moreButton)} onClick={handleLastVisibleReview}>Load More Reviews</Button>
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
