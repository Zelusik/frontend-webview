import WebviewContainer from "../components/WebViewContainer";
import Review from "../pages/review/Review";

export const bottomRoutes = [
  {
    title: "홈",
    name: "Home",
    component: WebviewContainer,
    act: require("../components/assets/images/bottomRoutes/home-fill.png"),
    none: require("../components/assets/images/bottomRoutes/home-none.png"),
  },
  {
    title: "지도",
    name: "Maps",
    component: WebviewContainer,
    act: require("../components/assets/images/bottomRoutes/map-fill.png"),
    none: require("../components/assets/images/bottomRoutes/map-none.png"),
  },
  {
    title: "리뷰쓰기",
    name: "Review",
    component: Review,
    act: require("../components/assets/images/bottomRoutes/review-fill.png"),
    none: require("../components/assets/images/bottomRoutes/review-none.png"),
  },
  {
    title: "저장",
    name: "Heart",
    component: WebviewContainer,
    act: require("../components/assets/images/bottomRoutes/heart-fill.png"),
    none: require("../components/assets/images/bottomRoutes/heart-none.png"),
  },
  {
    title: "마이",
    name: "Mypage",
    component: WebviewContainer,
    act: require("../components/assets/images/bottomRoutes/my-fill.png"),
    none: require("../components/assets/images/bottomRoutes/my-none.png"),
  },
];
