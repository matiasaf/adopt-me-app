import { Component } from "react";
import { withRouter } from "react-router-dom";
import Carousel from "./Carousel";

class Details extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      error: null,
      errorDetail: "",
    };
  }

  async componentDidMount() {
    const {
      match: { params },
    } = this.props;

    try {
      const res = await fetch(
        `http://pets-v2.dev-apis.com/pets?id=${params.id}`
      );
      const data = await res.json();

      const {
        animal,
        breed,
        city,
        state,
        description,
        name,
        images,
      } = data.pets[0];

      this.setState({
        loading: false,
        error: null,
        errorDetail: "",
        animal,
        breed,
        city,
        state,
        description,
        name,
        images,
      });
    } catch (err) {
      this.setState({
        loading: false,
        error: "Hubo bardo",
        errorDetail: JSON.stringify(err),
      });
    }
  }

  handleErrors(fn) {
    return function (...attribs) {
      return fn(...attribs).catch(() => {});
    };
  }

  render() {
    const { loading, error, errorDetail } = this.state;

    if (error) {
      return (
        <h2 className="loading">
          Uups! Hubo un error! Detalles: {errorDetail}
        </h2>
      );
    }

    if (loading) {
      return <h2 className="loading">loading … </h2>;
    }

    const {
      animal,
      breed,
      city,
      state,
      description,
      name,
      images,
    } = this.state;

    return (
      <div className="details">
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} — ${breed} — ${city}, ${state}`}</h2>
          <button>Adopt {name}</button>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

export default withRouter(Details);
