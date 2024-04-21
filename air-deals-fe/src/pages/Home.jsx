import InfoCard from "../components/InfoCard";
import Carousel from "../components/Carousel";
import logo from "../assets/logo.png";

function Home() {
  return (
    <>
      <div className="section evenSection">
        <div className="container">
          <img className="logo-img" src={logo} alt="Logo Image" />
          <div className="icon-scroll">
            <div className="mouse">
              <div className="wheel"></div>
            </div>
            <div className="icon-arrows">
              <span></span>
            </div>
          </div>
        </div>
      </div>
      <div className="section oddSection">
        <div className="container sec2">
          <h2 className="section-title">How Rent Radar Works</h2>
          <div className="info-cards">
            <InfoCard
              imagePath={"../public/location1.png"}
              title={"Begin with your desired location"}
              text={
                "Choose US departure airports like your biggest airport, closest airport, and maybe even your parent’s."
              }
            />
            <InfoCard
              imagePath={"../public/observe.png"}
              title={"Receive tailored deals."}
              text={
                "Our system constantly monitors rental listings across various platforms, scanning for the best deals that match your specified criteria. When we spot a great rental opportunity, you'll be the first to know."
              }
            />
            <InfoCard
              imagePath={"../public/hands.png"}
              title={"Secure your ideal rental."}
              text={
                "Explore comprehensive details about each rental opportunity, including photos, pricing, and vital information. We provide direct links for hassle-free access, making it a breeze for you to secure your perfect rental. Your next home is just a click away!"
              }
            />
          </div>
        </div>
      </div>
      <div className="section evenSection">
        <div className="container">
          <h2 className="section-title">Real Deals Secured by Users</h2>
          <div></div>
        </div>
      </div>
      <div className="section oddSection">
        <div className="container">
          <h2 className="section-title">Loved by Happy Renters</h2>
          {/* <div></div> */}
          <Carousel />
        </div>
      </div>
      <div className="section evenSection">
        <div className="container">
          <h2 className="section-title">Never Overpay for Rentals Again</h2>
          <div></div>
        </div>
      </div>
    </>
  );
}

export default Home;
