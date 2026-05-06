import React from 'react';
import { motion } from 'framer-motion';
import { skillsData, learningGoals } from '../../data/skills';
import { Sparkles, Brain, Cpu, Rocket, Database, Layers, Cloud } from 'lucide-react';

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
    <section id="skills" className="py-24 relative overflow-hidden bg-black/20">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            Technical <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">Arsenal</span>
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-cyan-500 to-purple-600 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            A meticulously organized collection of technologies structured for predictable performance and scalability.
          </p>
        </motion.div>

        {/* The Organized Grid Container */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillsData.map((category, idx) => (
            <motion.div 
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className={`group relative h-full ${idx === 6 ? 'md:col-span-2 lg:col-span-1' : ''}`}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-b from-white/10 to-transparent rounded-3xl blur-[2px] opacity-30 group-hover:opacity-100 transition duration-500"></div>
              
              <div className="relative h-full bg-slate-900/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl flex flex-col justify-between hover:bg-white/[0.04] transition-all duration-500 shadow-2xl">
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="p-3.5 bg-white/5 rounded-2xl text-cyan-400 shadow-sm border border-white/5">
                      {idx === 0 ? <Brain size={26} strokeWidth={1.5} /> : 
                       idx === 1 ? <Cpu size={26} strokeWidth={1.5} /> : 
                       idx === 2 ? <Layers size={26} strokeWidth={1.5} /> :
                       idx === 3 ? <Database size={26} strokeWidth={1.5} /> :
                       idx === 4 ? <Sparkles size={26} strokeWidth={1.5} /> :
                       idx === 5 ? <Cloud size={26} strokeWidth={1.5} /> :
                       <Rocket size={26} strokeWidth={1.5} />}
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 tracking-[3px] uppercase">
                      SYS-0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-cyan-400/90 mb-8 tracking-tight group-hover:text-cyan-300 transition-colors">
                    {category.category}
                  </h3>

                  {/* STRICT INTERNAL GRID SYSTEM */}
                  <div className={`grid gap-3 ${
                    category.category.includes('Languages') ? 'grid-cols-3 md:grid-cols-3' : 
                    category.category.includes('Frontend') ? 'grid-cols-3 lg:grid-cols-4' : 
                    category.category.includes('Backend') ? 'grid-cols-1' : 
                    'grid-cols-2'
                  }`}>
                    {category.skills.map((skill, sIdx) => (
                      <motion.div 
                        key={sIdx}
                        whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.08)' }}
                        className="px-2 py-2.5 bg-white/5 border border-white/10 rounded-full text-[11px] font-semibold text-slate-300 text-center truncate hover:text-white hover:border-cyan-500/40 transition-all duration-300 cursor-default"
                        title={skill}
                      >
                        {skill}
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Visual Accent */}
                <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  <span className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div>
                    Verified Stack
                  </span>
                  <span>v4.0</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Frontier Tech Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 p-1 bg-white/5 backdrop-blur-lg rounded-[2.5rem] border border-white/10 overflow-hidden group shadow-2xl"
        >
          <div className="p-8 md:p-12 relative overflow-hidden">
             <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
               <div className="text-center lg:text-left">
                 <h3 className="text-3xl font-black mb-2 text-white flex items-center justify-center lg:justify-start gap-3">
                   <Sparkles className="text-yellow-400 animate-pulse" /> Frontier Tech
                 </h3>
                 <p className="text-slate-400">Pioneering in emerging digital landscapes</p>
               </div>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-auto">
                 {learningGoals.map((goal, gIdx) => (
                   <div key={gIdx} className="px-6 py-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-all flex items-center gap-4 group/goal">
                     <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 group-hover/goal:scale-125 transition-transform shadow-[0_0_12px_rgba(6,182,212,1)]"></div>
                     <span className="text-sm font-bold text-slate-300 group-hover/goal:text-white transition-colors">{goal}</span>
                   </div>
                 ))}
               </div>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
