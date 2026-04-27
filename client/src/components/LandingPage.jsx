import React, { useState, useEffect, useRef } from "react";
import Hero     from '../assets/images/hero.jpg';
import Analytics from '../assets/images/analytics.webp';
import AboutUs1  from '../assets/images/about-us-1.png';
import AboutUs2  from '../assets/images/about-us-2.png';
import AboutUs3  from '../assets/images/about-us-3.png';
import { BarChart3, Zap, TrendingUp, Link, Bot, Shield, Check, ArrowRight, Sparkles, Upload, Download } from 'lucide-react';
import {fetchPublicStats} from "../services/api";

export default function LandingPage() {

  /* ── Scroll-triggered animated counter ── */
  const statsRef  = useRef(null);
  const [visible, setVisible] = useState(false);
  const [counts,  setCounts]  = useState({ users: 0, files: 0, uptime: 0, support: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.35 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

 useEffect(() => {
  if (!visible) return;

  const loadStats = async () => {
    const res = await fetchPublicStats();
    const targets = res.data;

    const steps = 70;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const p = 1 - Math.pow(1 - step / steps, 3);

      setCounts({
        users: Math.floor(p * targets.usersCount),
        files: Math.floor(p * targets.filesCount),
        
      });

      if (step >= steps) clearInterval(timer);
    }, 2000 / steps);
  };

  loadStats();
}, [visible]);

  const statCards = [
    { key: 'users',   display: (v) => `${v}+`,   label: 'Active Users'    },
    { key: 'uptime',  display: (v) => `99.9%`,   label: 'Uptime'          },
    { key: 'files',   display: (v) => `${v}+`,    label: 'Files Processed' },
    { key: 'support', display: (v) => `24/7`,    label: 'Support'         },
  ];

  const features = [
    { icon: BarChart3,  title: 'Smart Analytics',      description: 'AI-powered insights automatically detect patterns, trends, and anomalies in your Excel data — saving hours of manual work.' },
    { icon: Zap,        title: 'Real-time Processing',  description: 'Process millions of rows instantly. Upload your file and watch your dashboard populate in seconds, not minutes.' },
    { icon: TrendingUp, title: 'Dynamic Dashboards',    description: 'Switch between bar, line, pie, and area charts with one click. Download any chart as an image to share with your team.' },
    { icon: Link,       title: 'Easy File Management',  description: 'Every file you upload is saved. Browse your history, re-analyze old data, or compare reports across time.' },
    { icon: Bot,        title: 'AI-Powered Summaries',  description: 'Our LLM reads your data and writes a plain-English summary — no analytics expertise needed. Download it as a PDF.' },
    { icon: Shield,     title: 'Secure & Role-Based',   description: 'JWT authentication, bcrypt encryption, and a full Admin/User role system keep your data private and access controlled.' },
  ];

  return (
    <main>
      <style>{`
        @keyframes fadeUp   { from{opacity:0;transform:translateY(26px)} to{opacity:1;transform:translateY(0)} }
        @keyframes floatY   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes popIn    { 0%{transform:scale(0.6);opacity:0} 100%{transform:scale(1);opacity:1} }
        @keyframes shimmer  { 0%{background-position:200% center} 100%{background-position:-200% center} }

        .fu1{animation:fadeUp .6s ease .1s both}
        .fu2{animation:fadeUp .6s ease .22s both}
        .fu3{animation:fadeUp .6s ease .36s both}
        .fu4{animation:fadeUp .6s ease .48s both}
        .float-img{animation:floatY 5s ease-in-out infinite}
        .pop{animation:popIn .5s cubic-bezier(.34,1.56,.64,1) both}

        .grad-text{
          background:linear-gradient(120deg,#1e3a8a,#0ea5e9,#1e3a8a);
          background-size:200% auto;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          animation:shimmer 4s linear infinite;
        }

        .feat-card{
          position:relative; overflow:hidden;
          transition:transform .3s ease,box-shadow .3s ease,border-color .3s ease;
        }
        .feat-card::before{
          content:''; position:absolute; top:0; left:0; right:0; height:3px;
          background:linear-gradient(90deg,#1e40af,#0ea5e9);
          transform:scaleX(0); transition:transform .35s ease; transform-origin:left;
        }
        .feat-card:hover{transform:translateY(-8px);box-shadow:0 24px 60px rgba(30,58,138,.14)!important;border-color:#93c5fd!important}
        .feat-card:hover::before{transform:scaleX(1)}
        .feat-card .icon-box{transition:transform .3s ease}
        .feat-card:hover .icon-box{transform:scale(1.12)}

        .about-card{transition:transform .4s ease,box-shadow .4s ease}
        .about-card:hover{transform:translateY(-10px) scale(1.04)!important;box-shadow:0 32px 64px rgba(30,58,138,.2)!important}

        .stat-num{
          background:linear-gradient(135deg,#60a5fa,#e0f2fe);
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          font-weight:800;
        }
      `}</style>

      {/* ══════════════════════════════════
          HERO
      ══════════════════════════════════ */}
      <section className="bg-gradient-to-br from-blue-50 via-sky-50 to-white px-6 pb-0 pt-20">
        <div className="container mx-auto flex flex-col lg:flex-row items-center gap-14">

          {/* Left */}
          <div className="flex-1 text-center lg:text-left">

            {/* Badge */}
            <div className="fu1 inline-flex items-center gap-2 bg-blue-100 border border-blue-200 text-blue-700 text-xs font-bold px-4 py-2 rounded-full mb-6">
              <Sparkles size={12} /> AI-Powered Excel Analytics Platform
            </div>

            <h1 className="fu2 text-4xl lg:text-5xl font-extrabold leading-tight text-blue-900 mb-5">
              Upload Excel.{' '}
              <span className="grad-text">Get instant</span>
              <br />charts &amp; AI insights.
            </h1>

            <p className="fu3 text-gray-500 text-lg leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
              Drag and drop any <strong className="text-blue-700">.xlsx</strong> or <strong className="text-blue-700">.csv</strong> file.
              Get beautiful bar, line, pie and area charts — plus an AI-written summary — in under 30 seconds.
            </p>

            {/* CTAs */}
            <div className="fu4 flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
              <a href="/sign-up"
                className="inline-flex items-center gap-2 bg-blue-800 hover:bg-blue-900 text-white font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-blue-200 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-200 text-sm">
                Get started free <ArrowRight size={15} />
              </a>
              <a href="/sign-in"
                className="inline-flex items-center gap-2 border-2 border-blue-200 hover:border-blue-400 text-blue-800 font-bold px-7 py-3.5 rounded-xl transition-all duration-200 hover:bg-blue-50 text-sm">
                Sign in
              </a>
            </div>

            {/* Trust chips */}
            <div className="fu4 flex flex-wrap gap-5 justify-center lg:justify-start">
              {['No credit card needed', 'Free forever plan', 'Works with any .xlsx'].map(t => (
                <div key={t} className="flex items-center gap-1.5 text-gray-400 text-xs font-medium">
                  <Check size={13} className="text-sky-400" strokeWidth={2.5} /> {t}
                </div>
              ))}
            </div>
          </div>

          {/* Right — hero image */}
          <div className="flex-1 flex justify-center">
            <img
              src={Hero}
              alt="Excel Analytics Platform"
              className="float-img w-full max-w-lg rounded-2xl shadow-2xl shadow-blue-100"
            />
          </div>
        </div>

        {/* Wave divider */}
        <svg viewBox="0 0 1440 52" className="block mt-16 w-full" preserveAspectRatio="none">
          <path d="M0,26 C480,52 960,0 1440,26 L1440,52 L0,52 Z" fill="#1e3a8a" />
        </svg>
      </section>

      {/* ══════════════════════════════════
          STATS  (scroll-triggered)
      ══════════════════════════════════ */}
      <section ref={statsRef} className="bg-blue-900 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {statCards.map(({ key, display, label }, i) => (
              <div
                key={key}
                className={`text-center py-12 px-6 ${i < 3 ? 'border-r border-blue-800/60' : ''} max-lg:${i === 1 ? 'border-r-0' : ''}`}
              >
                <div
                  className={`text-5xl md:text-6xl mb-3 stat-num ${visible ? 'pop' : 'opacity-0'}`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {display(counts[key])}
                </div>
                <p className="text-blue-300 font-semibold text-base">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <svg viewBox="0 0 1440 40" className="block w-full" preserveAspectRatio="none">
          <path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" fill="#f0f9ff" />
        </svg>
      </section>

      {/* ══════════════════════════════════
          ANALYSIS WE PROVIDE
      ══════════════════════════════════ */}
      <section className="bg-sky-50 px-4 py-20">
        <div className="container mx-auto flex flex-col lg:flex-row gap-14 items-center">

          <div className="flex-1 flex justify-center">
            <img
              src={Analytics}
              alt="Data Analysis"
              className="w-full max-w-md rounded-2xl shadow-xl shadow-blue-100"
            />
          </div>

          <div className="flex-1">
            <div className="inline-flex items-center gap-2 bg-blue-100 border border-blue-200 text-blue-700 text-xs font-bold px-4 py-2 rounded-full mb-5">
              <BarChart3 size={12} /> What We Analyze
            </div>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-blue-900 mb-5 leading-tight">
              From raw numbers<br />to clear decisions
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-8">
              Upload any Excel or CSV file and instantly get interactive charts.
              Our AI reads your data and writes a plain-English summary so you always
              know exactly what the numbers mean — no data expertise required.
            </p>
            <div className="flex flex-col gap-4">
              {[
                { icon: Upload,    text: 'Drag & drop any .xlsx or .csv — any size' },
                { icon: BarChart3, text: '4 chart types: bar, line, pie, area — switch in one click' },
                { icon: Bot,       text: 'LLM-generated AI summary written in plain English' },
                { icon: Download,  text: 'Download charts as images & summaries as PDFs' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-100 to-sky-100 flex items-center justify-center flex-shrink-0 border border-blue-200">
                    <Icon size={16} className="text-blue-700" />
                  </div>
                  <span className="text-gray-600 font-medium text-sm">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          ABOUT US
      ══════════════════════════════════ */}
      <section className="bg-white px-4 py-20" id="about-us">
        <div className="container mx-auto text-center">

          <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-3">About Us</p>
          <h3 className="text-3xl lg:text-4xl text-blue-900 font-extrabold mb-5">
            We provide big data analytics<br />&amp; real-time data solutions
          </h3>
          <p className="text-gray-500 max-w-2xl mx-auto mb-14 text-base leading-relaxed">
            Whether it's interactive dashboards, AI-enhanced data insights, or automated chart generation —
            our platform helps anyone make sense of their spreadsheet data faster than ever before.
          </p>

          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            {[AboutUs1, AboutUs2, AboutUs3].map((img, i) => (
              <div
                key={i}
                className="about-card bg-gradient-to-br from-blue-50 to-sky-100 p-16 rounded-2xl shadow-lg border border-blue-100 flex items-center justify-center"
              >
                <img src={img} className="w-44 h-44 object-contain" alt={`About us ${i + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          FEATURES
      ══════════════════════════════════ */}
      <section className="relative z-10 bg-blue-50 py-20 lg:py-28" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 border border-blue-200 text-blue-700 text-xs font-bold px-4 py-2 rounded-full mb-5">
              <Zap size={12} /> Platform Features
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-blue-900">
              Supercharge Your Spreadsheets
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-base">
              Everything you need to turn spreadsheet data into actionable insights — no data science degree required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {features.map(({ icon: Icon, title, description }, index) => (
              <div
                key={index}
                className="feat-card group bg-white rounded-3xl p-8 shadow-md border border-gray-100"
              >
                <div className="icon-box w-14 h-14 bg-gradient-to-br from-blue-700 to-sky-500 rounded-2xl flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-blue-900 mb-3">{title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          CTA BANNER
      ══════════════════════════════════ */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 to-sky-700 rounded-3xl p-14 text-center shadow-2xl shadow-blue-200">

            {/* Decorative blobs */}
            <div className="absolute -top-16 -right-16 w-56 h-56 bg-white/5 rounded-full" />
            <div className="absolute -bottom-12 -left-12 w-44 h-44 bg-white/5 rounded-full" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/15 text-blue-100 text-xs font-bold px-4 py-2 rounded-full mb-5">
                <Sparkles size={12} /> Free to get started
              </div>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4 leading-tight">
                Your spreadsheet data<br />deserves better
              </h2>
              <p className="text-blue-200 mb-10 max-w-md mx-auto text-base leading-relaxed">
                Stop staring at raw numbers. Get charts and AI-written summaries from any Excel file in seconds.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a href="/sign-up"
                  className="inline-flex items-center gap-2 bg-white text-blue-900 font-bold px-8 py-3.5 rounded-xl shadow-lg hover:-translate-y-1 transition-all duration-200 text-sm">
                  Get started free <ArrowRight size={15} />
                </a>
                <a href="/sign-in"
                  className="inline-flex items-center gap-2 bg-white/15 border border-white/30 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/25 transition-all duration-200 text-sm">
                  Sign in
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}