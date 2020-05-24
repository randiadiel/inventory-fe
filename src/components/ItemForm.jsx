import React, { Component } from "react";
import { Button, Form, Message } from "semantic-ui-react";
import { withOktaAuth } from "@okta/okta-react";

import { API_BASE_URL } from "../config";

export default withOktaAuth(
  class ItemForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        id: "",
        name: "",
        qty: "",
        price: "",
        date_registered: "",
        box_status: "",
        location: "",
        error: false,
        isLoading: false,
      };
      this.handleChange = this.handleChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange(e) {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }

    async onSubmit(e) {
      e.preventDefault();
      this.setState({
        isLoading: true,
        error: false,
        errorMessage: "",
      });

      const accessToken = await this.props.authService.getAccessToken();
      const response = await fetch(API_BASE_URL + "/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
        body: JSON.stringify({
          id: this.state.id,
          name: this.state.name,
          qty: this.state.qty,
          price: this.state.price,
          date_registered: this.state.date_registered,
          box_status: this.state.box_status,
          location: this.state.location,
        }),
      });
      const item = await response.json();

      if (item.errors) {
        this.setState({
          isLoading: false,
          error: true,
          errorMessage: item.errors,
        });
      } else {
        this.setState({
          name: "",
          isLoading: false,
          error: false,
          errorMessage: "",
        });
        this.props.onAddition(item.data);
      }
    }

    render() {
      return (
        <Form error={this.state.error} onSubmit={this.onSubmit}>
          <Form.Field error={this.state.error}>
            <label>Item ID:</label>
            <input
              name="id"
              placeholder="enter item id"
              value={this.state.id}
              onChange={this.handleChange}
            />
            {this.state.error && (
              <Message
                error
                header="Error creating item"
                content={this.state.errorMessage}
              />
            )}
          </Form.Field>
          <Form.Field error={this.state.error}>
            <label>Item Name:</label>
            <input
              name="name"
              placeholder="enter item name"
              value={this.state.name}
              onChange={this.handleChange}
            />
            {this.state.error && (
              <Message
                error
                header="Error creating item"
                content={this.state.errorMessage}
              />
            )}
          </Form.Field>
          <Form.Field error={this.state.error}>
            <label>Quantity:</label>
            <input
              name="qty"
              placeholder="enter item qty"
              value={this.state.qty}
              onChange={this.handleChange}
            />
            {this.state.error && (
              <Message
                error
                header="Error creating item"
                content={this.state.errorMessage}
              />
            )}
          </Form.Field>
          <Form.Field error={this.state.error}>
            <label>Item Price:</label>
            <input
              name="price"
              placeholder="enter item price"
              value={this.state.price}
              onChange={this.handleChange}
            />
            {this.state.error && (
              <Message
                error
                header="Error creating item"
                content={this.state.errorMessage}
              />
            )}
          </Form.Field>
          <Form.Field error={this.state.error}>
            <label>Date Bought:</label>
            <input
              name="date_registered"
              type="date"
              placeholder="enter date"
              value={this.state.date_registered}
              onChange={this.handleChange}
            />
            {this.state.error && (
              <Message
                error
                header="Error creating item"
                content={this.state.errorMessage}
              />
            )}
          </Form.Field>
          <Form.Field error={this.state.error}>
            <label>In The Box?:</label>
            <input
              name="box_status"
              placeholder="if present in the box 1 else 0"
              value={this.state.box_status}
              onChange={this.handleChange}
            />
            {this.state.error && (
              <Message
                error
                header="Error creating item"
                content={this.state.errorMessage}
              />
            )}
          </Form.Field>
          <Form.Field error={this.state.error}>
            <label>Store Location:</label>
            <input
              name="location"
              placeholder="where u store the item"
              value={this.state.location}
              onChange={this.handleChange}
            />
            {this.state.error && (
              <Message
                error
                header="Error creating item"
                content={this.state.errorMessage}
              />
            )}
          </Form.Field>

          <Button type="submit" loading={this.state.isLoading}>
            Add Item
          </Button>
        </Form>
      );
    }
  }
);
