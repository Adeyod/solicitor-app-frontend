import { motion } from 'framer-motion';

import companyLogo from '/src/images/companyLogo.png';
import ImageFile from '../components/ImageFile';

const HomePage = () => {
  return (
    <div className="text-[5679BF] h-[100vh] md:h-[100%] flex flex-col justify-center items-center p-5">
      <div className="">
        <h1 className="text-2xl md:text-4xl text-center lg:text-4xl italic">
          Welcome to
          <span className="text-primary font-bold"> XYX Solicitor!!!</span>
        </h1>
      </div>

      <div className="md:flex justify-center gap-[190px] md:gap-[55px] items-center mt-[50px] lg:mt-0">
        <motion.div
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 20, duration: 5 }}
          initial={{ x: '-100vw', opacity: 0 }}
          className="md:pb-10 flex items-center justify-center"
        >
          <img src={companyLogo} className="w-[40vw]" />
        </motion.div>

        <div className="mt-10 lg:mt-0 lg:flex lg:flex-col gap-30 items-center">
          <h1 className="text-2xl text-nowrap md:text-4xl mr-12 mb-5 lg:text-3xl italic">
            Your
            <span className="text-primary font-bold uppercase"> partner </span>
            in legal matters
          </h1>

          <motion.div
            className="flex justify-center"
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 20, duration: 5 }}
            initial={{ x: '100vw', opacity: 0 }}
          >
            <ImageFile />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
