import SectionTitle from "../Common/SectionTitle";
import { InfiniteMovingCards } from "../ui/infiniteMovingCards";

const Feedback = () => {
  const feedbacks = [{
    "name": "John Doe",
    "comment": "Nice product for my developer presence",
    "designation": "Founder & Leader",
    "image": "/images/blog/author-03.png"
  },
  {
    "name": "Steve Smith",
    "comment": "Nice product for my developer presence",
    "designation": "Software Engineer",
    "image": "/images/blog/author-02.png"
  },
  {
    "name": "Clara Bell",
    "comment": "Nice product for my developer presence",
    "designation": "CTO",
    "image": "/images/blog/author-01.png"
  }
]
  return (
    <section id="feedback" className="overflow-hidden py-8 md:py-10 lg:py-14">
      <div className="container">
        
        <div className="-mx-4 flex flex-wrap items-center  ">
            
            <div className="w-full px-4">
              <SectionTitle
                title="What people are saying about us"
                paragraph=""
                mb="44px"
                width="550px"
              />

            </div>
            <div className="w-full px-4 h-auto">
            <InfiniteMovingCards
            items={feedbacks}
            direction="right"
            speed="slow"
      />

            </div>
            
          </div>
        
      </div>
    </section>
  );
};

export default Feedback;
