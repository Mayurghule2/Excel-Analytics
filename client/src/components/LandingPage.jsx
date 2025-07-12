import React,{useState, useEffect} from "react";
import Hero from '../assets/images/hero.jpg'
import Analytics from '../assets/images/analytics.webp'
import AboutUs1 from '../assets/images/about-us-1.png'
import AboutUs2 from '../assets/images/about-us-2.png'
import AboutUs3 from '../assets/images/about-us-3.png'
import { BarChart3, Zap, TrendingUp, Link, Bot, Shield, Menu, X } from 'lucide-react';
export default function LandingPage() {

    const AnimatedCounter = ({ target, suffix = "" }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      const targetNum = parseInt(target.replace(/[^0-9.]/g, ''));
      let current = 0;
      const increment = targetNum / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= targetNum) {
          setCount(targetNum);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, 50);
      return () => clearInterval(timer);
    }, [target]);

    return (
      <span className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-400 to-cyan bg-clip-text text-transparent">
        {target.includes('.') ? target : count.toLocaleString()}{suffix}
      </span>
    );
  };

   const stats = [
    { number: "50K+", label: "Active Users" },
    { number: "99.9%", label: "Uptime" },
    { number: "10M+", label: "Files Processed" },
    { number: "24/7", label: "Support" }
  ];

  const features = [
    {
      icon: BarChart3,
      title: "Smart Analytics",
      description: "AI-powered insights automatically detect patterns, trends, and anomalies in your Excel data, saving hours of manual analysis."
    },
    {
      icon: Zap,
      title: "Real-time Processing",
      description: "Process millions of rows instantly with our cloud-powered engine. No more waiting for Excel to catch up with your data."
    },
    {
      icon: TrendingUp,
      title: "Dynamic Dashboards",
      description: "Create stunning, interactive dashboards that update automatically as your Excel data changes. Share insights with your team effortlessly."
    },
    {
      icon: Link,
      title: "Seamless Integration",
      description: "Works directly with your existing Excel files. Upload, connect, or sync with OneDrive, SharePoint, and Google Sheets."
    },
    {
      icon: Bot,
      title: "Automated Reports",
      description: "Schedule automated reports and alerts. Get notified when key metrics change or targets are met."
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level encryption and compliance with SOC 2, GDPR, and HIPAA. Your data stays secure and private."
    }
  ];


  return (
    <main className="">
      <section className="pb-16 px-10 bg-gradient-to-b from-blue-50 to-white pt-20 ">
        <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-blue-800 mb-4">
              Applying Data Science<br /> And Techniques with Systems
            </h1>
            <p className="text-gray-600 mb-6">
              Combined data through integration, analytical decision from the data warehouse. Data collection stored through Hadoop Models. Faster ways to access Big Data.
            </p>
            
          </div>
          <div className="flex-1">
            <img
              src={Hero}
              alt="Hero Illustration"
              className="w-full max-w-lg mx-auto shadow-lg"
            />
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12">
        <div className="container mx-auto flex flex-col lg:flex-row gap-8 items-center">
          <div className="flex-1">
            <img
              src={Analytics}
              alt="Data Analysis"
              className="w-full max-w-lg mx-auto shadow-md"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl text-blue-900 font-semibold mb-4">Analysis We Provide</h2>
            <p className="text-gray-600 mb-6">
              Expectation of obtaining an abstraction information of the data to derive business insights. Our tools examine the competition from the bottom up, providing a dashboard to visualize key performance indicators.
            </p>
            
          </div>
        </div>
      </section>

      <section className="bg-blue-50 px-4 py-16" id="about-us">
        <div className="container mx-auto text-center">
          <h2 className="text-blue-600 font-semibold mb-2">ABOUT US</h2>
          <h3 className="text-3xl text-blue-900 font-bold mb-4">
            We provide big data analytics Techniques & realtime data Solutions
          </h3>
          <p className="text-gray-600 max-w-3xl mx-auto mb-8">
            Whether it is our data research through ML models or real-time dashboard services, our team helps organizations learn algorithms, business functions and AI-enhanced data insights. We combine techniques such as Hadoop & Spark with intuitive dashboards (Qlik or Power BI) to optimize output.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center ">
            <div className="bg-blue-100 p-20 rounded-md hover:scale-105 transition-transform duration-500 shadow-lg">

            <img src={AboutUs1} className="w-48 h-48 " alt="" srcset="" />
            </div>
            <div className="bg-blue-100 p-20 rounded-md hover:scale-105 transition-transform duration-500 shadow-lg">

            <img src={AboutUs2} className="w-48 h-48" alt="" srcset="" />
            </div>
            <div className="bg-blue-100 p-20 rounded-md hover:scale-105 transition-transform duration-500 shadow-lg">

            <img src={AboutUs3} className="w-48 h-48" alt="" srcset="" />
            </div>
          </div>
        </div>
      </section>
      
      <section className="relative z-10 bg-blue-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="group">
                <div className="mb-4">
                  <AnimatedCounter target={stat.number} />
                </div>
                <p className="text-lg text-gray-300 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="relative z-10 bg-white py-20 lg:py-32 " id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-indigo-800 to-blue-900 bg-clip-text text-transparent">
              Supercharge Your Spreadsheets
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 hover:border-indigo-200 overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#06eaea] to-cyan-400" />
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-blue-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-blue-900 mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
        
        
    </main>
  );
}