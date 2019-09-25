import React, { Component } from "react";
import { Image, Transformation } from "cloudinary-react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const transformations = [
  [{ crop: "fill", width: "150", height: "150", radius: "10" }],
  [{ crop: "scale", width: "150", height: "150" }],
  [{ crop: "fit", width: "150", height: "150" }],
  [{ crop: "thumb", gravity: "face", width: "150", height: "150" }],
  [
    {
      crop: "fill",
      effect: "sepia",
      gravity: "north",
      width: "150",
      height: "150",
      radius: "20"
    },
    { angle: "20" }
  ]
];

const styles = {
  thumbnails: {
    padding: "1rem"
  },
  info: {
    border: "solid blue 1px",
    padding: "10px"
  },
  thumbnailHolder: {
    border: "solid black 1px",
    margin: "1rem",
    display: "flex",
    justifyContent: "space-between"
  }
};

class PhotoThumbnailsComponent extends Component {
  constructor(props) {
    super(props);
    // create a ref to store the textInput DOM element
    this.handleSelectTransForm = this.handleSelectTransForm.bind(this);
  }

  handleSelectTransForm(url) {
    const { close, selectFilter } = this.props;
    selectFilter(url);
    close();
  }

  render() {
    const { classes, publicId, urlBase } = this.props;
    return (
      <div className={classes.thumbnails}>
        <Grid item xs={12}>
          {transformations.map((transformation, idx) => {
            const transformURL = makeTransformUrl(
              urlBase,
              publicId,
              transformation
            );
            return (
              <div
                className={classes.thumbnailHolder}
                key={"a" + idx + +Math.random().toString()}
              >
                <Image
                  key={"a" + idx + +Math.random().toString()}
                  publicId={publicId}
                  className="thumbnail inline"
                  format="jpg"
                >
                  <div>
                    {transformation.map((subTransformation, index) => {
                      return (
                        <Transformation
                          key={"a" + index + +Math.random().toString()}
                          {...subTransformation}
                        />
                      );
                    })}
                  </div>
                </Image>
                <div className={classes.info}>
                  <div> Photo Traits :</div>
                  {transformation.map(subTransformation => {
                    return Object.keys(subTransformation).map(prop => {
                      return (
                        <div
                          style={{ border: "solid red 1px" }}
                          key={"b" + idx + Math.random().toString()}
                        >
                          {`${prop}: ${subTransformation[prop]}`}
                        </div>
                      );
                    });
                  })}
                  <button
                    onClick={() => this.handleSelectTransForm(transformURL)}
                  >
                    Select
                  </button>
                </div>
              </div>
            );
          })}
        </Grid>
      </div>
    );
  }
}

export const PhotoThumbnails = withStyles(styles)(PhotoThumbnailsComponent);

function makeTransformUrl(url, id, trans) {
  let transDescription = "";
  const cut = url.indexOf("/v") + 1;
  let newBase = url.slice(0, cut);
  let tail = url.slice(-4);
  trans.map(subTrans => {
    const keyArr = Object.keys(subTrans);
    return keyArr.map(prop => {
      const str = `${prop[0]}_${subTrans[prop]},`;
      transDescription += str;
    });
  });
  const final = transDescription.slice(0, transDescription.length - 1);
  return `${newBase}${final}/${id}${tail}`;
}
