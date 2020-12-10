import React from "react";
import Swiper from "react-id-swiper";
import "./slick.scss";
import Button from "../Button/Button";

interface IProps {
  linktag: string;
  productTitle: string;
  data: any[];
  textTitle: string;
  onClick: () => void;
}

const Slick: React.FC<IProps> = (props) => {
  const params = {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    renderPrevButton: () => (
      <span className="customcss-prev">
        <span className="swiper-button-prev" />
      </span>
    ),
    renderNextButton: () => (
      <span className="customcss-next">
        <span className="swiper-button-next" />
      </span>
    ),
    breakpoints: {
      1024: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
    },
  };

  function handleClick() {
    props.onClick();
  }

  return (
    <div className="section-slick-container">
      <div className="section-slick-wrapper">
        <div className="content col-xs-12">
          <div style={{ textAlign: "center" }} id={props.linktag}>
            <h3>{props.productTitle}</h3>
          </div>
          <div className="tab-contents">
            <Swiper {...params}>
              {props.data.map((details) => {
                return (
                  <div key={details.id}>
                    <img src={details.imageName} />
                    <div className="content-text">
                      {/* <p className="price"> {details.classDetails}</p> */}
                      <p className="title">
                        Date of Commencement of Courses 15 June.
                      </p>
                      <p className="desc">
                        Get upto 50% Scholarship / Discount on Selected Courses.
                      </p>
                      {/* <div className="rating">
                        <i className="icon_star_filled voted" />
                        <i className="icon_star_filled voted" />
                        <i className="icon_star_filled voted" />
                        <i className="icon_star_filled voted" />
                        <i className="icon_star" />{" "}
                        <small>({details.rating})</small>
                      </div> */}
                      <Button title={props.textTitle} onClick={handleClick} />
                    </div>
                  </div>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slick;
