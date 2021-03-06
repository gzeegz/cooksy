import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

import { createMeal } from '../actions';
import {
  renderTextAreaField,
  renderTimeField,
  renderTextField,
  renderDateField,
  isZipcode
} from '../utils/FormHelper';
import './NewMealForm.css';

export class NewMealForm extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(values) {
    //values.images = `${values.photo_1},${values.photo_2},${values.photo_3},${values.photo_4}`;
    values.images = values.photo_1 || values.photo_2 || values.photo_3 || values.photo_4;
    values.deliveryDateTime = `${values.deliveryDate.toDateString()} ${values.deliveryTime}`;
    this.props.createMeal(values, this.props.history.push('/meals'));
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.submitForm)}>
          <h1>Submit a New Meal</h1>
          <div>
            <Field
              name="name"
              component={renderTextField}
              label="Meal Name"
            />
          </div>
          <div>
            <Field
              name="description"
              component={renderTextAreaField}
              label="Description"
              multiLine={true}
              rows={2}
            />
          </div>
          <div>
            <Field
              hintText="Delivery Date"
              name="deliveryDate"
              component={renderDateField}
              autoOk={true}
            />
            <Field
              name="deliveryTime"
              component={renderTimeField}
            />
          </div>
          <div className="images-container">
            <div>
              <Field
                name="photo_1"
                component={renderTextField}
                type="text"
                label="https://example.com/photo.jpeg"
                floatingLabelText="Image 1"
              />
            </div>
            <div>
              <Field
                name="photo_2"
                component={renderTextField}
                type="text"
                label="https://example.com/photo.jpeg"
                floatingLabelText="Image 2"
              />
            </div>
            <div>
              <Field
                name="photo_3"
                component={renderTextField}
                type="text"
                label="https://example.com/photo.jpeg"
                floatingLabelText="Image 3"
              />
            </div>
            <div>
              <Field
                name="photo_4"
                component={renderTextField}
                type="text"
                label="https://example.com/photo.jpeg"
                floatingLabelText="Image 4"
              />
            </div>
          </div>
          <div>
            <Field
              name="price"
              component={renderTextField}
              label="12"
              floatingLabelText="Price ($)"
            />
            <Field
              name="servings"
              component={renderTextField}
              label="10"
              floatingLabelText="Servings"
            />
          </div>
          <div>
            <Field
              name="pickupInfo"
              component={renderTextAreaField}
              label="Pickup Info"
              multiLine={true}
              rows={2}
            />
          </div>
          <div>
            <Field name="address" component={renderTextField} label="Address" />
          </div>
          <div>
            <Field name="city" component={renderTextField} label="City" />
            <Field name="state" component={renderTextField} label="State" />
          </div>
          <div>
            <Field name="zipcode" component={renderTextField} label="Zipcode" />
          </div>
          <div>
            <RaisedButton type="submit" disabled={pristine || submitting}>
              Submit
            </RaisedButton>
          </div>
        </form>
      </div>
    );
  }
}

export const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  }

  if (!values.deliveryDate) {
    errors.deliveryDate = 'Required';
  }

  if (!values.deliveryTime) {
    errors.deliveryTime = 'Required';
  }

  if (!values.pickupInfo) {
    errors.pickupInfo = 'Required';
  }

  if (!values.price) {
    errors.price = 'Required';
  }

  if (isNaN(values.price)) {
    errors.price = 'Price should be a number';
  }

  if (!values.servings) {
    errors.servings = 'Required';
  }

  if (isNaN(values.servings)) {
    errors.servings = 'Servings should be a number';
  }

  if (!isZipcode(values.zipcode)) {
    errors.zipcode = 'Add a valid zipcode';
  }

  return errors;
};

export default reduxForm({
  validate,
  form: 'NewMealForm'
})(connect(null, { createMeal })(NewMealForm));
