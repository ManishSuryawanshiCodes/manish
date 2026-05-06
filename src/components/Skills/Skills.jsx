import React from 'react';
import { motion } from 'framer-motion';
import { skillsData, learningGoals } from '../../data/skills';
import { Sparkles, Brain, Cpu, Rocket } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 12 
    }
  }
};

const Skills = () => {
  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Technical <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Arsenal</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-purple-600 mx-auto rounded-full"></div>
          <p className="mt-6 text-slate-400 text-lg max-w-2xl mx-auto">
            A fusion of modern tech stacks and creative logic, built to solve real-world problems.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skillsData.map((category, idx) => (
            <motion.div 
              key={idx}
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="group relative"
            >
              {/* Outer Glow on Hover */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
              
              <div className="relative h-full bg-slate-900/40 backdrop-blur-xl border border-white/10 p-8 rounded-2xl hover:border-white/20 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-white/5 rounded-xl text-cyan-400 group-hover:text-cyan-300 transition-colors">
                    {idx === 0 ? <Brain size={24} /> : idx === 1 ? <Cpu size={24} /> : <Rocket size={24} />}
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-100 transition-colors">
                    {category.category}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, sIdx) => (
                    <motion.span 
                      key={sIdx}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 hover:border-cyan-500/30 transition-all cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Learning Goals Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 p-8 bg-gradient-to-r from-cyan-900/10 to-purple-900/10 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Sparkles size={120} />
          </div>
          
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-white">
            <Sparkles className="text-yellow-400" /> Currently Exploring
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {learningGoals.map((goal, gIdx) => (
              <div key={gIdx} className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div>
                <span className="text-sm text-slate-300">{goal}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
