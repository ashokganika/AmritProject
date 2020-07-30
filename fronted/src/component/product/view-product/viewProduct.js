import React, { Component } from "react";
import axios from "axios";
import utils from "./../../../utils/moment";
import { Loader } from "../../common/loader/loader.component";
import { httpClient } from "../../../utils/httpclient";
import notification from "../../../utils/notification";

const IMG_URL = process.env.REACT_APP_IMG_URL;

export default class ViewProductComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    if (this.props.productData) {
      this.setState({
        product: this.props.productData,
      });
    } else {
      this.setState({
        isLoading: true,
      });
      httpClient
        .get("http://localhost:2021/api/product", {}, true)

        .then((response) => {
          this.setState({
            product: response.data,
          });
        })
        .catch((err) => {})
        .finally(() => {
          this.setState({
            isLoading: false,
          });
        });
    }
  }
  editProduct = (id) => {
    this.props.history.push(`/Edit-Product/${id}`);
  };
  deleteProduct = (id, index) => {
    console.log("id>>", id + "index>>" + index);
    // eslint-disable-next-line no-restricted-globals
    let confirmation = confirm("Are you sure want to delete?");
    if (confirmation) {
      axios
        .delete(`http://localhost:2021/api/product/${id}`, {
          headers: {
            "content-Type": "application/json",
            authorization: localStorage.getItem("token"),
          },
        })
        .then((response) => {
          notification.showInfo("item deleted sucessfully");
          const { product } = this.state;
          product.splice(index, 1);
          this.setState({
            product,
          });
        })
        .catch((err) => {});
    }
  };
  formatDate = () => {};
  formatTime = () => {};

  render() {
    console.log(this.state.product);
    let tableContent = (this.state.product || []).map((item, index) => (
      <tr key={item._id}>
        <td>{index + 1}</td>
        <td>{item.name}</td>
        <td>{item.category}</td>
        <td>{item.price}</td>
        <td>{utils.formatDate(item.createdAt)}</td>
        <td>{utils.formatTime(item.createdAt)}</td>
        <td>
          <img
            src={`${IMG_URL}/${item.images[0]}`}
            alt="image.jpeg"
            width="100"
            height="100"
          ></img>
        </td>

        <td>
          <button
            onClick={() => this.editProduct(item._id)}
            className="btn btn-info"
          >
            edit
          </button>
          <button
            onClick={() => this.deleteProduct(item._id, index)}
            className="btn btn-danger"
          >
            delete
          </button>
        </td>
      </tr>
    ));
    let mainContent = this.state.isLoading ? (
      <Loader></Loader>
    ) : (
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>S.N</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Created Date</th>
            <th>Created Time</th>
            <th>Images</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
    return (
      <>
        <h2>View Product</h2>
        {mainContent}
      </>
    );
  }
}
