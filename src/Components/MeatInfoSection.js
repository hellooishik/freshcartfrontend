import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/MeatInfoSection.css';

const MeatInfoSection = () => {
  return (
    <section className="section-bg py-5">
      <div className="container">
        <div className="row">
          {/* Column 1 */}
          <div className="col-md-4">
            <div className="line"></div>
            <h5 className="fw-bold mt-3">We will sell only the meat that we would eat ourselves.</h5>
            <p>
              At Freshcart, we’re big meat-lovers. And by big, we mean huge. So when it comes to the meat we put on your plate, 
              we’re extremely picky. Every single product is handpicked by a team with years of experience.
            </p>
          </div>

          {/* Column 2 */}
          <div className="col-md-4">
            <div className="line"></div>
            <h5 className="fw-bold mt-3">If it’s not fresh, we won’t sell it</h5>
            <p>
              For meat to stay fresh and retain its natural juices, it needs to be stored at a temperature between 0° and 4°C. 
              We maintain this temperature from the time we procure the product to cleaning, cutting and storing it, 
              until it leaves for delivery. Did we mention that we’re obsessed?
            </p>
          </div>

          {/* Column 3 */}
          <div className="col-md-4">
            <div className="line"></div>
            <h5 className="fw-bold mt-3">We will charge only for what you buy</h5>
            <p>
              Doesn’t everyone do this? Not really. Most other places first weigh the meat, then cut up the pieces, and throw out the parts 
              which aren’t fit to eat, such as offal, gizzard, wingtips, etc. But you still pay based on the original weight even though what 
              you finally get is 10% to 30% less.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeatInfoSection;
