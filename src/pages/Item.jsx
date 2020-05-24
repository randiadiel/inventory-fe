import React, { Component } from "react";
import { Header, Table, Button, Modal } from "semantic-ui-react";
import { withOktaAuth } from "@okta/okta-react";

import { API_BASE_URL } from "../config";
import ItemForm from "../components/ItemForm";
import DeleteItemButton from "../components/DeleteItemButton";
import Navbar from "../components/Navbar";

export default withOktaAuth(
  class Items extends Component {
    constructor(props) {
      super(props);
      this.state = {
        items: null,
        isLoading: null,
      };
      this.onAddition = this.onAddition.bind(this);
      this.onDelete = this.onDelete.bind(this);
    }
    onDelete(id) {
      let items = this.state.items;
      let index = items.findIndex((item) => item.id === id);
      items.splice(index, 1);
      this.setState({
        items: items,
      });
    }
    componentDidMount() {
      this.getItems();
    }

    onAddition(item) {
      this.setState({
        items: [...this.state.items, item],
      });
    }

    async getItems() {
      if (!this.state.items) {
        try {
          this.setState({ isLoading: true });
          const accessToken = await this.props.authService.getAccessToken();
          const response = await fetch(API_BASE_URL + "/items", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const itemsList = await response.json();
          this.setState({ items: itemsList.data, isLoading: false });
        } catch (err) {
          this.setState({ isLoading: false });
          console.error(err);
        }
      }
    }

    render() {
      return (
        <div>
          <Navbar active="1" />
          <Header as="h1">Items</Header>

          {this.state.isLoading && (
            <div className="ui active dimmer">
              <div className="ui text loader">Loading</div>
            </div>
          )}
          <Modal trigger={<Button>Add New Item</Button>}>
            <Modal.Header>Add a New Item</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <ItemForm onAddition={this.onAddition} />
              </Modal.Description>
            </Modal.Content>
          </Modal>
          <div className="ui horizontal divider">Item List</div>
          {this.state.items && (
            <div>
              <Table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Date Bought</th>
                    <th>Box</th>
                    <th>Store Location</th>
                    <th>Date Registered</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.items.map((item) => (
                    <tr id={item.id} key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.qty}</td>
                      <td>{item.price}</td>
                      <td>{item.date_registered}</td>
                      <td>
                        {item.box_status === 1
                          ? "In the box"
                          : "not in the box"}
                      </td>
                      <td>{item.location}</td>
                      <td>{item.created_at}</td>
                      <td>
                        <DeleteItemButton
                          onDelete={this.onDelete}
                          itemId={item.id}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </div>
      );
    }
  }
);
