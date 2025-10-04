import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const QuestionSection = () => {
  const [ref, inView] = useInView({ threshold: 0.3 });
  const [question, setQuestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Thank you for your question! We\'ll address this in our research.');
      setQuestion('');
    }, 2000);
  };

  return (
    <div ref={ref} className="w-full max-w-4xl mx-auto text-center">
      <motion.h2 
        className="text-5xl font-bold mb-8 text-white"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
          Your Voice Matters
        </span>
      </motion.h2>

      <motion.p 
        className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Have questions about wildfire impacts, prevention, or solutions? 
        Share your thoughts and join the conversation.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="question" className="block text-left text-gray-300 mb-3 text-lg">
              Your Question or Concern:
            </label>
            <textarea
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="What would you like to know about wildfire impacts and solutions?"
              className="w-full h-32 px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 resize-none"
              required
            />
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting || !question.trim()}
            className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
              isSubmitting || !question.trim()
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-orange-500/25'
            }`}
            whileHover={!isSubmitting && question.trim() ? { scale: 1.05 } : {}}
            whileTap={!isSubmitting && question.trim() ? { scale: 0.95 } : {}}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Submitting...</span>
              </div>
            ) : (
              'Submit Your Question'
            )}
          </motion.button>
        </form>

        <motion.div 
          className="mt-8 pt-8 border-t border-white/10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h4 className="text-lg font-semibold text-white mb-4">Frequently Asked Questions</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <FAQItem 
              question="What causes most wildfires?" 
              answer="Human activities cause 85% of wildfires, while lightning causes 15%."
            />
            <FAQItem 
              question="How can we prevent wildfires?" 
              answer="Through controlled burns, forest management, and public awareness campaigns."
            />
            <FAQItem 
              question="Are wildfires increasing globally?" 
              answer="Yes, frequency and intensity have increased 25% over 25 years due to climate change."
            />
            <FAQItem 
              question="What's the economic impact?" 
              answer="Wildfires cost billions annually in damages, firefighting, and health impacts."
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

const FAQItem = ({ question, answer }) => (
  <motion.div 
    className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-orange-500/30 transition-all duration-300"
    whileHover={{ x: 5 }}
  >
    <h5 className="font-semibold text-orange-400 mb-2">{question}</h5>
    <p className="text-gray-400 text-sm">{answer}</p>
  </motion.div>
);

export default QuestionSection;