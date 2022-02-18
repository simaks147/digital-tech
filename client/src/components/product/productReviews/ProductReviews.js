import React, {useState} from 'react';
import styles from "./productReviews.module.css";
import {Row, Col, FloatingLabel, Form} from "react-bootstrap";
import {ReactComponent as StarFullIcon} from "../../../icons/star-full-icon.svg";
import {ReactComponent as StarEmptyIcon} from "../../../icons/star-empty-icon.svg";
import Button from "react-bootstrap/Button";
import cn from "classnames";

const ProductReviews = () => {
  const [recommendValue, setRecommendValue] = useState(false);
  const handleChangeRecommend = () => setRecommendValue(!recommendValue);

  return (
    <div className={styles.main}>
      <Row>
        <Col lg={6}>
          <div className={styles.overall}>
            <div className={styles.overallTitle}>Overall Customer Rating:</div>
            <div className={styles.overallRating}>
              <div className={styles.overallStars}>
                <StarFullIcon/>
                <StarFullIcon/>
                <StarFullIcon/>
                <StarFullIcon/>
                <StarEmptyIcon/>
              </div>
              <div className={styles.overallCount}>3.75</div>
            </div>
            <div className={styles.overallSubtitle}>Based on 4 Reviews</div>
            <div className={styles.overallText}>75% of customers would recommend this product to a friend (3 out of 4)
            </div>
          </div>
          <div className={styles.form}>
            <div className={styles.formTitle}>Write Your Review:</div>
            <div className={styles.formRating}>
              <span className={styles.formRatingCaption}>Rating:</span>
              <span className={styles.formStars}>
              <StarFullIcon/>
              <StarFullIcon/>
              <StarFullIcon/>
              <StarEmptyIcon/>
              <StarEmptyIcon/>
            </span>
            </div>
            <Form>
              <FloatingLabel controlId="name" label="Your Name">
                <Form.Control type="text" name="name" placeholder="Your Name"/>
              </FloatingLabel>
              <FloatingLabel controlId="email" label="Your E-mail">
                <Form.Control type="email" name="email" placeholder="Your E-mail"/>
              </FloatingLabel>
              <FloatingLabel controlId="title" label="Review Title">
                <Form.Control type="text" name="title" placeholder="Review Title"/>
              </FloatingLabel>
              <FloatingLabel controlId="review" label="Your Review">
                <Form.Control as="textarea" name="review" placeholder="Your Review"/>
              </FloatingLabel>
              <Form.Check id="recommend" className={cn(styles.formRecommend, {active: recommendValue})}>
                <Form.Check.Input type={'checkbox'} className={styles.formRecommendInput} checked={recommendValue} onChange={handleChangeRecommend}/>
                <Form.Check.Label className={styles.formRecommendLabel}>I would recommend this to a friend!</Form.Check.Label>
              </Form.Check>
              <Button className={cn('c-button', styles.submitButton)}>Submit Review</Button>
            </Form>
          </div>
        </Col>
        <Col lg={6}>
          <div className={styles.list}>
            <div className={styles.item}>
              <div className={styles.itemStars}>
                <StarFullIcon/>
                <StarFullIcon/>
                <StarFullIcon/>
                <StarFullIcon/>
                <StarFullIcon/>
              </div>
              <div className={styles.itemDate}>November, 24 2016</div>
              <div className={styles.itemName}>Eugene Barnett</div>
              <div className={styles.itemTitle}>Perfect Size and Easy to Use</div>
              <div className={styles.itemText}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
                nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim
                veniam.
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.itemStars}>
                <StarFullIcon/>
                <StarFullIcon/>
                <StarFullIcon/>
                <StarFullIcon/>
                <StarFullIcon/>
              </div>
              <div className={styles.itemDate}>November, 24 2016</div>
              <div className={styles.itemName}>Eugene Barnett</div>
              <div className={styles.itemTitle}>Perfect Size and Easy to Use</div>
              <div className={styles.itemText}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
                nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim
                veniam.
              </div>
            </div>
          </div>
          <Button className={cn('c-button', styles.moreButton)}>Load More Reviews</Button>
        </Col>
      </Row>
    </div>
  );
}

export default ProductReviews;
