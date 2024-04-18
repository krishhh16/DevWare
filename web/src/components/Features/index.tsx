import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";

const Features = () => {
  return (
    <>
      <section id="features" className="pb-16 md:pb-20 lg:pb-28">
        <div className="w-full h-16 md:h-20 lg:h-28" style={{ background: 'linear-gradient(#221f4a, #00040f)'}}></div>
        <div className="container">
          <SectionTitle
            title="Main Features"
            paragraph="We help you with the key things that not only focus on getting you more reach, but also maintain quaity."
            center
          />

          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map((feature) => (
              <SingleFeature key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
