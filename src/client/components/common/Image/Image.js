import React from "react";
import { Loading } from "../../navigation";

class ImageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
    this.handleImageLoaded = this.handleImageLoaded.bind(this);
    this.handleImageLoaded = this.handleImageLoaded.bind(this);
  }

  handleImageLoaded() {
    this.setState({
      loading: false
    });
  }

  handleImageErrored() {
    this.setState({ loading: true });
  }

  render() {
    const { loading } = this.state;
    const {
      containerClassName,
      imgClassName,
      showSpinner = true,
      style
    } = this.props;
    const showDecide = loading ? {} : { display: "none", visiblity: "hidden" };

    return (
      <div className={containerClassName}>
        <img
          className={imgClassName}
          src={this.props.src}
          onLoad={this.handleImageLoaded.bind(this)}
          onError={this.handleImageErrored.bind(this)}
          style={style}
        />
        {showSpinner && (
          <Loading
            loading={loading}
            isImage={true}
            className={containerClassName}
          />
        )}
      </div>
    );
  }
}
export const Image = ImageComponent;
