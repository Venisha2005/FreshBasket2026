import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // npm install framer-motion

function About() {
  // Animation settings
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  // ✅ Sliding images state
  const images = ["ff.jpg", "fruitc.jpg", "fp.jpg"];
  const [currentIndex, setCurrentIndex] = useState(0);

  // ✅ Auto slide every 3 sec
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Title */}
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-4xl font-bold text-green-700 mb-6"
        >
          About Us
        </motion.h1>

        

        {/* ✅ Responsive Sliding Image Box */}
        <div className="relative w-full h-[30vh] sm:h-[35vh] md:h-[45vh] lg:h-[50vh] overflow-hidden">
          {images.map((img, i) => (
            <motion.img
              key={i}
              src={`/images/${img}`} // ✅ from public/images folder
              alt="Fresh fruit"
              className="absolute top-0 left-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: i === currentIndex ? 1 : 0 }}
              transition={{ duration: 0.8 }}
            />
          ))}
        </div>

        {/* Info Box */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="bg-white shadow-lg rounded-2xl p-6 mt-10 hover:shadow-2xl transition"
        >
          <h2 className="text-2xl font-semibold text-green-700 mb-4"><center>Our Story</center></h2>
         <p className="text-gray-700 leading-relaxed">
  FreshBasket began with a simple belief — that everyone deserves access to
  fresh, healthy, and organic fruits.  
  <br /><br />
  We noticed how many families struggled to find truly fresh produce, while
  farmers struggled to reach the right customers.  
  <br /><br />
  In 2024, we decided to bridge this gap by building a platform that directly
  connects farmers and households.  
  <br /><br />
  Every fruit in FreshBasket is handpicked, quality-checked, and delivered with
  care to ensure freshness.  
  <br /><br />
  More than a marketplace, FreshBasket is a movement that promotes healthy
  eating, supports farmers, and reduces food waste.  
  <br /><br />
  Our journey has just begun, but our promise remains strong: bringing you the
  goodness of nature, one basket at a time.
</p>

        </motion.div>

        {/* Vision Box */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="bg-white shadow-lg rounded-2xl p-6 mt-10 hover:shadow-2xl transition text-left"
        >
          <h2 className="text-2xl font-semibold text-green-700 mb-3"><center>Our Vision</center></h2>
          <p className="text-gray-700 leading-relaxed">
  At FreshBasket, our vision is to create a healthier world,  
  where every family has access to fresh and organic fruits.  
  <br /><br />
  We dream of a future where farmers are empowered,  
  and their produce reaches homes without middlemen.  
  <br /><br />
  We aim to reduce the gap between nature and people,  
  making healthy choices simple, affordable, and available to all.  
  <br /><br />
  Our vision is to inspire mindful eating,  
  build a sustainable community, and spread wellness.  
  <br /><br />
  FreshBasket strives to be more than a store —  
  we want to be a trusted partner in your journey to healthy living.
</p>

        </motion.div>

        {/* Mission Box */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="bg-white shadow-lg rounded-2xl p-6 mt-10 hover:shadow-2xl transition text-left"
        >
          <h2 className="text-2xl font-semibold text-green-700 mb-3"><center>Our Mission</center> </h2>
          <p className="text-gray-700 leading-relaxed">
  Our mission at FreshBasket is to bring freshness straight from farms  
  to every household with trust and transparency.  
  <br /><br />
  We are committed to supporting local farmers,  
  ensuring they receive fair value for their hard work.  
  <br /><br />
  By using smart delivery systems,  
  we guarantee that fruits stay fresh from farm to your table.  
  <br /><br />
  We aim to reduce food waste,  
  promote healthy lifestyles, and make nutrition accessible.  
  <br /><br />
  FreshBasket’s mission is to create a world  
  where good health begins with fresh and natural choices.
</p>

        </motion.div>

        {/* Outro */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-gray-700 text-lg leading-relaxed mt-10"
        >
          FreshBasket is more than just a store — it’s a movement to make healthy
          eating accessible...
        </motion.p>
      </div>
    </div>
  );
}

export default About;
