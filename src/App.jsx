import { useState, useEffect, useRef } from "react";
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap');`;
const CSS = `
* { box-sizing:border-box; margin:0; padding:0; }
body { font-family:'Inter',sans-serif; background:#F5F1E8; color:#2E2B27; }
:root {
  --forest:#2F5D50; --pine:#1F3D35; --moss:#6F8F72;
  --cream:#F5F1E8; --parchment:#E9E1D1; --stone:#C9C1B3;
  --bark:#2E2B27; --gold:#C59A3D; --rust:#A65A3A;
  --success:#3E7C4C; --drop:#7AA95C; --alert:#B85C38;
}
.grain { position:fixed; inset:0; pointer-events:none; z-index:200; opacity:0.022;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }
nav { background:var(--pine); padding:0 2rem; display:flex; align-items:center; justify-content:space-between; height:64px; position:sticky; top:0; z-index:150; box-shadow:0 2px 20px rgba(0,0,0,0.25); }
.nav-logo { font-family:'Lora',serif; font-size:1.3rem; font-weight:700; color:var(--cream); display:flex; align-items:center; gap:9px; letter-spacing:-0.02em; cursor:pointer; flex-shrink:0; }
.nav-logo span { color:var(--gold); }
.nav-links { display:flex; gap:0.25rem; align-items:center; }
.nav-item { position:relative; }
.nav-btn { background:none; border:none; color:var(--stone); font-size:0.82rem; font-weight:500; letter-spacing:0.04em; text-transform:uppercase; padding:0.5rem 0.75rem; cursor:pointer; font-family:'Inter',sans-serif; transition:color 0.2s; display:flex; align-items:center; gap:4px; border-radius:6px; white-space:nowrap; }
.nav-btn:hover, .nav-btn.active { color:var(--cream); background:rgba(255,255,255,0.06); }
.nav-btn svg { width:10px; height:10px; transition:transform 0.2s; }
.nav-btn.open svg { transform:rotate(180deg); }
.dropdown { position:absolute; top:calc(100% + 8px); left:0; background:#fff; border:1px solid var(--stone); border-radius:12px; min-width:220px; box-shadow:0 12px 40px rgba(0,0,0,0.18); z-index:300; overflow:hidden; animation:ddFade 0.15s ease; }
@keyframes ddFade { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:translateY(0)} }
.dd-item { display:flex; align-items:center; gap:10px; padding:0.65rem 1rem; font-size:0.83rem; color:var(--bark); cursor:pointer; transition:background 0.15s; font-family:'Inter',sans-serif; text-decoration:none; }
.dd-item:hover { background:var(--cream); color:var(--forest); }
.dd-item.active { background:#eaf5ec; color:var(--forest); font-weight:600; }
.dd-divider { height:1px; background:var(--parchment); margin:0.3rem 0; }
.dd-icon { font-size:1rem; width:22px; text-align:center; flex-shrink:0; }
.nav-pill { background:var(--gold); color:var(--pine); padding:0.4rem 1rem; border-radius:999px; font-size:0.76rem; font-weight:600; letter-spacing:0.05em; text-transform:uppercase; cursor:pointer; border:none; font-family:'Inter',sans-serif; transition:background 0.2s; margin-left:0.5rem; white-space:nowrap; }
.nav-pill:hover { background:#d4aa4d; }
.live-bar { background:var(--forest); padding:0.45rem 2rem; display:flex; align-items:center; justify-content:space-between; font-size:0.76rem; color:var(--parchment); }
.live-dot { width:7px; height:7px; border-radius:50%; background:var(--drop); margin-right:6px; animation:pulse 1.8s ease-in-out infinite; display:inline-block; }
@keyframes pulse { 0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.4;transform:scale(0.7)} }
.live-label { display:flex; align-items:center; font-weight:500; }
.live-count { color:var(--gold); font-weight:600; }
.hero { background:linear-gradient(160deg,var(--pine) 0%,var(--forest) 60%,#3a6b5a 100%); padding:4rem 2rem 3rem; position:relative; overflow:hidden; }
.hero::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse at 75% 50%,rgba(197,154,61,0.09) 0%,transparent 65%); }
.hero-inner { max-width:960px; margin:0 auto; position:relative; }
.hero-eyebrow { font-size:0.7rem; font-weight:600; letter-spacing:0.18em; text-transform:uppercase; color:var(--gold); margin-bottom:0.75rem; }
.hero h1 { font-family:'Lora',serif; font-size:clamp(2rem,5vw,3.2rem); font-weight:700; color:var(--cream); line-height:1.12; margin-bottom:0.9rem; letter-spacing:-0.025em; }
.hero h1 em { font-style:italic; color:var(--gold); }
.hero p { color:var(--moss); font-size:0.97rem; max-width:500px; line-height:1.65; margin-bottom:2rem; }
.hero-search { display:flex; gap:0.5rem; max-width:560px; }
.hero-search input { flex:1; padding:0.85rem 1.2rem; background:rgba(255,255,255,0.09); border:1.5px solid rgba(255,255,255,0.15); border-radius:8px; color:var(--cream); font-family:'Inter',sans-serif; font-size:0.88rem; outline:none; transition:border-color 0.2s; }
.hero-search input::placeholder { color:var(--moss); }
.hero-search input:focus { border-color:var(--gold); }
.hero-search button { background:var(--gold); color:var(--pine); border:none; border-radius:8px; padding:0.85rem 1.4rem; font-weight:600; font-family:'Inter',sans-serif; font-size:0.86rem; cursor:pointer; white-space:nowrap; }
.hero-search button:hover { background:#d4aa4d; }
.hero-stats { display:flex; gap:2.5rem; margin-top:2.5rem; padding-top:2rem; border-top:1px solid rgba(255,255,255,0.1); }
.stat-val { font-family:'Lora',serif; font-size:1.8rem; font-weight:700; color:var(--cream); line-height:1; }
.stat-lbl { font-size:0.71rem; color:var(--moss); text-transform:uppercase; letter-spacing:0.09em; margin-top:3px; }
.section { max-width:1200px; margin:0 auto; padding:3rem 2rem; }
.section-label { font-size:0.7rem; font-weight:700; letter-spacing:0.15em; text-transform:uppercase; color:var(--moss); margin-bottom:0.5rem; }
.section-title { font-family:'Lora',serif; font-size:1.6rem; font-weight:700; color:var(--pine); margin-bottom:0.4rem; }
.section-sub { font-size:0.82rem; color:var(--moss); margin-bottom:1.75rem; line-height:1.5; }
.snapshot-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(220px,1fr)); gap:1rem; }
.snap-card { background:#fff; border:1px solid var(--stone); border-radius:14px; padding:1.2rem 1.25rem 1rem; cursor:pointer; transition:all 0.2s; position:relative; overflow:hidden; }
.snap-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:var(--forest); }
.snap-card:hover { transform:translateY(-3px); box-shadow:0 10px 30px rgba(47,93,80,0.13); border-color:var(--moss); }
.snap-cat-row { display:flex; align-items:center; gap:8px; margin-bottom:0.85rem; }
.snap-icon { font-size:1.3rem; }
.snap-cat-name { font-size:0.72rem; font-weight:700; text-transform:uppercase; letter-spacing:0.1em; color:var(--moss); }
.snap-price { font-family:'Lora',serif; font-size:1.9rem; font-weight:700; color:var(--pine); line-height:1; margin-bottom:0.3rem; }
.snap-product-name { font-size:0.82rem; font-weight:600; color:var(--bark); margin-bottom:0.2rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.snap-disp { font-size:0.75rem; color:var(--moss); margin-bottom:0.8rem; }
.snap-link { font-size:0.73rem; font-weight:600; color:var(--forest); display:flex; align-items:center; gap:4px; }
.snap-link:hover { color:var(--gold); }
.snap-tag { position:absolute; top:12px; right:12px; background:#fef3e2; color:#8a5000; border-radius:999px; padding:0.15rem 0.45rem; font-size:0.62rem; font-weight:700; text-transform:uppercase; }
.tax-notice { background:#fff8e6; border:1.5px solid var(--gold); border-radius:10px; padding:0.75rem 1rem; font-size:0.78rem; color:var(--bark); display:flex; align-items:flex-start; gap:0.6rem; line-height:1.55; }
.tax-notice strong { color:var(--pine); }
.badge-no-tax { background:#fff3cd; color:#856404; border-radius:999px; padding:0.15rem 0.5rem; font-size:0.62rem; font-weight:700; text-transform:uppercase; border:1px solid #f0d060; white-space:nowrap; }
.prices-wrap { max-width:1200px; margin:0 auto; padding:2rem; }
.prices-header { margin-bottom:1.5rem; }
.prices-header h2 { font-family:'Lora',serif; font-size:1.7rem; font-weight:700; color:var(--pine); margin-bottom:0.3rem; }
.prices-header p { font-size:0.83rem; color:var(--moss); }
.filter-strip { background:#fff; border:1px solid var(--stone); border-radius:12px; padding:1rem 1.2rem; display:flex; gap:0.6rem; align-items:center; flex-wrap:wrap; margin-bottom:1.25rem; }
.fs-label { font-size:0.7rem; font-weight:700; text-transform:uppercase; letter-spacing:0.09em; color:var(--moss); white-space:nowrap; }
.fs-divider { width:1px; height:20px; background:var(--parchment); flex-shrink:0; }
.fs-chip { padding:0.35rem 0.85rem; border-radius:999px; font-size:0.75rem; font-weight:500; cursor:pointer; border:1.5px solid var(--stone); background:transparent; color:var(--bark); font-family:'Inter',sans-serif; transition:all 0.16s; white-space:nowrap; }
.fs-chip:hover { border-color:var(--forest); color:var(--forest); }
.fs-chip.on { background:var(--pine); border-color:var(--pine); color:#fff; }
.fs-select { padding:0.35rem 0.7rem; border-radius:8px; font-size:0.75rem; border:1.5px solid var(--stone); background:#fff; color:var(--bark); font-family:'Inter',sans-serif; cursor:pointer; outline:none; }
.fs-select:focus { border-color:var(--forest); }
.fs-search { padding:0.35rem 0.85rem; border-radius:8px; font-size:0.75rem; border:1.5px solid var(--stone); background:#fff; color:var(--bark); font-family:'Inter',sans-serif; outline:none; min-width:160px; }
.fs-search:focus { border-color:var(--forest); }
.fs-count { margin-left:auto; font-size:0.76rem; color:var(--moss); white-space:nowrap; }
.product-list { display:flex; flex-direction:column; gap:0.75rem; }
.prod-card { background:#fff; border:1px solid var(--stone); border-radius:12px; overflow:hidden; transition:box-shadow 0.2s; display:flex; }
.prod-card:hover { box-shadow:0 6px 24px rgba(47,93,80,0.11); }
.prod-card.best-card { border-color:var(--success); }
.prod-img { width:110px; min-height:110px; flex-shrink:0; background:var(--parchment); display:flex; align-items:center; justify-content:center; font-size:2.5rem; position:relative; }
.prod-img .prod-rank { position:absolute; top:8px; left:8px; background:var(--pine); color:#fff; border-radius:999px; width:22px; height:22px; display:flex; align-items:center; justify-content:center; font-size:0.65rem; font-weight:700; }
.prod-img .best-badge { position:absolute; bottom:8px; left:50%; transform:translateX(-50%); background:var(--success); color:#fff; border-radius:999px; padding:0.15rem 0.5rem; font-size:0.6rem; font-weight:700; text-transform:uppercase; white-space:nowrap; }
.prod-img .sale-badge { position:absolute; top:8px; right:8px; background:var(--alert); color:#fff; border-radius:6px; padding:0.12rem 0.4rem; font-size:0.62rem; font-weight:700; }
.prod-body { flex:1; padding:0.9rem 1rem 0.9rem 1rem; display:flex; gap:1rem; min-width:0; }
.prod-main { flex:1; min-width:0; }
.prod-top-row { display:flex; align-items:flex-start; justify-content:space-between; gap:0.5rem; margin-bottom:0.35rem; }
.prod-name { font-family:'Lora',serif; font-size:1rem; font-weight:700; color:var(--pine); line-height:1.2; }
.prod-brand { font-size:0.73rem; color:var(--moss); margin-bottom:0.25rem; }
.prod-desc { font-size:0.78rem; color:var(--bark); line-height:1.5; margin-bottom:0.55rem; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
.prod-meta-row { display:flex; flex-wrap:wrap; gap:0.4rem; align-items:center; margin-bottom:0.5rem; }
.meta-pill { padding:0.18rem 0.55rem; border-radius:999px; font-size:0.67rem; font-weight:600; text-transform:uppercase; letter-spacing:0.04em; }
.pill-sativa  { background:#fff8e6; color:#8a6000; }
.pill-indica  { background:#ede8fe; color:#5a1a9a; }
.pill-hybrid  { background:#e8f5eb; color:var(--success); }
.pill-cbd     { background:#e8f0fe; color:#1a4a9a; }
.pill-na      { background:var(--parchment); color:var(--moss); }
.pill-size    { background:var(--parchment); color:var(--bark); }
.terp-row { display:flex; gap:0.35rem; flex-wrap:wrap; margin-bottom:0.45rem; }
.terp-chip { background:#f0f7f0; border:1px solid #c8e6c8; color:var(--forest); border-radius:999px; padding:0.12rem 0.5rem; font-size:0.65rem; font-weight:500; }
.prod-disp-row { font-size:0.73rem; color:var(--moss); display:flex; align-items:center; gap:6px; }
.prod-disp-row strong { color:var(--bark); font-weight:600; }
.updated-ts { font-size:0.65rem; color:var(--stone); }
.prod-price-col { flex-shrink:0; display:flex; flex-direction:column; align-items:flex-end; justify-content:space-between; min-width:130px; }
.price-final { font-family:'Lora',serif; font-size:1.4rem; font-weight:700; color:var(--pine); line-height:1; }
.price-final.best-price { color:var(--success); }
.price-sub { font-size:0.72rem; color:var(--moss); margin-top:2px; text-align:right; }
.price-menu { font-size:0.75rem; color:var(--stone); text-decoration:line-through; margin-top:4px; }
.ppg-tag { font-size:0.71rem; font-weight:600; color:var(--forest); background:#eaf5ec; border-radius:999px; padding:0.15rem 0.5rem; margin-top:5px; }
.thc-cbd-row { display:flex; gap:0.5rem; margin-top:8px; }
.thc-badge { padding:0.2rem 0.55rem; border-radius:8px; font-size:0.72rem; font-weight:700; }
.thc-high   { background:#fde8e8; color:var(--alert); }
.thc-mid    { background:#fff3e0; color:#8a5000; }
.thc-low    { background:var(--parchment); color:var(--moss); }
.cbd-badge  { background:#e8f0fe; color:#1a4a9a; padding:0.2rem 0.55rem; border-radius:8px; font-size:0.72rem; font-weight:700; }
.prod-link  { font-size:0.73rem; font-weight:600; color:var(--forest); text-decoration:none; display:flex; align-items:center; gap:3px; margin-top:8px; }
.prod-link:hover { color:var(--gold); }
.ch-down { color:var(--drop); font-weight:700; font-size:0.8rem; }
.ch-up   { color:var(--alert); font-weight:700; font-size:0.8rem; }
.ch-flat { color:var(--stone); font-size:0.8rem; }
.deals-strip { display:grid; grid-template-columns:repeat(auto-fill,minmax(295px,1fr)); gap:1rem; }
.deal-card { background:#fff; border:1px solid var(--stone); border-radius:12px; overflow:hidden; transition:box-shadow 0.2s,transform 0.2s; position:relative; }
.deal-card:hover { box-shadow:0 8px 28px rgba(47,93,80,0.12); transform:translateY(-2px); }
.deal-savings-badge { position:absolute; top:10px; right:10px; background:var(--alert); color:#fff; border-radius:8px; padding:0.25rem 0.55rem; font-size:0.72rem; font-weight:700; }
.deal-body { padding:1rem 1.1rem 0.75rem; }
.deal-disp-row { font-size:0.68rem; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; color:var(--moss); margin-bottom:0.2rem; display:flex; align-items:center; gap:5px; }
.deal-title { font-family:'Lora',serif; font-size:0.97rem; font-weight:700; color:var(--pine); margin-bottom:0.35rem; line-height:1.3; }
.deal-desc  { font-size:0.78rem; color:var(--bark); line-height:1.5; margin-bottom:0.65rem; }
.deal-prices { display:flex; align-items:center; gap:0.55rem; margin-bottom:0.5rem; }
.deal-final { font-family:'Lora',serif; font-size:1.25rem; font-weight:700; color:var(--success); }
.deal-orig  { font-size:0.82rem; color:var(--stone); text-decoration:line-through; }
.deal-per   { font-size:0.72rem; color:var(--moss); }
.deal-tags  { display:flex; gap:0.35rem; flex-wrap:wrap; }
.deal-tag   { padding:0.18rem 0.5rem; border-radius:999px; font-size:0.66rem; font-weight:600; text-transform:uppercase; }
.tag-preroll     { background:#fef3e2; color:#8a5000; }
.tag-vape        { background:#e8f0fe; color:#1a4a9a; }
.tag-flower      { background:#e8f5eb; color:var(--success); }
.tag-edible      { background:#fde8fe; color:#7a1a9a; }
.tag-concentrate { background:#fee8e8; color:#9a1a1a; }
.tag-store       { background:var(--parchment); color:var(--moss); }
.deal-footer { padding:0.55rem 1.1rem; background:var(--cream); display:flex; justify-content:space-between; border-top:1px solid var(--parchment); font-size:0.71rem; color:var(--moss); }
.deal-link { color:var(--forest); font-weight:600; text-decoration:none; font-size:0.71rem; }
.deal-link:hover { color:var(--gold); }
footer { background:var(--pine); padding:2.5rem 2rem; text-align:center; color:var(--moss); font-size:0.79rem; line-height:1.85; }
footer strong { font-family:'Lora',serif; color:var(--cream); font-size:1.05rem; display:block; margin-bottom:0.4rem; }
footer a { color:var(--gold); text-decoration:none; }
@keyframes fadeIn { from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)} }
.fadeIn { animation:fadeIn 0.3s ease forwards; }
.divider { height:1px; background:var(--parchment); margin:3rem 0; max-width:1200px; margin-left:auto; margin-right:auto; }
.budget-wrap { max-width:1200px; margin:0 auto; padding:2rem; }
.budget-hero { background:linear-gradient(135deg,#1a2f28 0%,var(--pine) 100%); border-radius:16px; padding:2rem 2.5rem; margin-bottom:2rem; display:flex; align-items:center; justify-content:space-between; gap:1.5rem; flex-wrap:wrap; }
.budget-hero-title { font-family:'Lora',serif; font-size:1.6rem; font-weight:700; color:var(--cream); margin-bottom:0.3rem; }
.budget-hero-sub { font-size:0.85rem; color:var(--moss); }
.budget-range-nav { display:flex; gap:0.5rem; flex-wrap:wrap; }
.brange-btn { padding:0.45rem 1rem; border-radius:999px; font-size:0.78rem; font-weight:600; cursor:pointer; border:2px solid rgba(255,255,255,0.2); background:rgba(255,255,255,0.07); color:var(--cream); font-family:'Inter',sans-serif; transition:all 0.18s; white-space:nowrap; }
.brange-btn:hover { border-color:var(--gold); background:rgba(197,154,61,0.15); }
.brange-btn.on { background:var(--gold); border-color:var(--gold); color:var(--pine); }
.budget-section { margin-bottom:3rem; }
.budget-section-header { display:flex; align-items:center; gap:1rem; margin-bottom:1.25rem; padding-bottom:0.75rem; border-bottom:2px solid var(--parchment); }
.budget-range-label { font-family:'Lora',serif; font-size:1.3rem; font-weight:700; color:var(--pine); }
.budget-range-count { font-size:0.78rem; color:var(--moss); background:var(--parchment); border-radius:999px; padding:0.2rem 0.65rem; font-weight:500; }
.budget-cat-tag { padding:0.2rem 0.6rem; border-radius:999px; font-size:0.68rem; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; background:var(--parchment); color:var(--moss); }
.budget-card { background:#fff; border:1px solid var(--stone); border-radius:12px; overflow:hidden; transition:box-shadow 0.2s; display:flex; align-items:stretch; }
.budget-card:hover { box-shadow:0 6px 24px rgba(47,93,80,0.11); }
.budget-card-price { background:var(--pine); color:#fff; width:80px; flex-shrink:0; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:0.75rem 0.5rem; }
.bcp-amount { font-family:'Lora',serif; font-size:1.5rem; font-weight:700; line-height:1; }
.bcp-tax { font-size:0.6rem; color:var(--moss); text-align:center; margin-top:4px; line-height:1.3; }
.budget-card-body { flex:1; padding:0.75rem 1rem; display:flex; align-items:center; gap:0.75rem; min-width:0; }
.budget-card-img { font-size:1.6rem; flex-shrink:0; }
.budget-card-info { flex:1; min-width:0; }
.bci-name { font-family:'Lora',serif; font-size:0.92rem; font-weight:700; color:var(--pine); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.bci-brand { font-size:0.7rem; color:var(--moss); margin-bottom:0.2rem; }
.bci-meta { display:flex; gap:0.35rem; flex-wrap:wrap; align-items:center; }
.budget-card-right { flex-shrink:0; display:flex; flex-direction:column; align-items:flex-end; gap:0.35rem; padding-right:0.25rem; }
.bcr-disp { font-size:0.72rem; font-weight:600; color:var(--bark); text-align:right; }
.bcr-town { font-size:0.68rem; color:var(--moss); }
.bcr-link { font-size:0.7rem; font-weight:600; color:var(--forest); text-decoration:none; cursor:pointer; }
.bcr-link:hover { color:var(--gold); }
.budget-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(420px,1fr)); gap:0.65rem; }
.empty-range { padding:1.5rem; background:#fff; border:1px dashed var(--stone); border-radius:12px; text-align:center; color:var(--moss); font-size:0.82rem; }
.disp-page-wrap { max-width:1200px; margin:0 auto; padding:2rem; }
.disp-page-header { margin-bottom:1.75rem; }
.disp-page-header h2 { font-family:'Lora',serif; font-size:1.8rem; font-weight:700; color:var(--pine); margin-bottom:0.3rem; }
.disp-page-header p { font-size:0.83rem; color:var(--moss); }
.disp-filter-bar { display:flex; gap:0.5rem; flex-wrap:wrap; align-items:center; margin-bottom:1.5rem; }
.disp-town-tabs { display:flex; gap:0.4rem; flex-wrap:wrap; margin-bottom:2rem; }
.dtt-btn { padding:0.38rem 0.9rem; border-radius:999px; font-size:0.78rem; font-weight:500; cursor:pointer; border:1.5px solid var(--stone); background:transparent; color:var(--bark); font-family:'Inter',sans-serif; transition:all 0.18s; white-space:nowrap; }
.dtt-btn:hover { border-color:var(--forest); color:var(--forest); }
.dtt-btn.on { background:var(--forest); border-color:var(--forest); color:#fff; }
.town-section { margin-bottom:3rem; }
.town-section-label { font-family:'Lora',serif; font-size:1.2rem; font-weight:700; color:var(--pine); margin-bottom:0.2rem; display:flex; align-items:center; gap:0.6rem; }
.town-disp-count { font-size:0.75rem; color:var(--moss); font-weight:400; font-family:'Inter',sans-serif; }
.town-map-link { font-size:0.72rem; color:var(--forest); font-weight:600; text-decoration:none; font-family:'Inter',sans-serif; }
.town-divider { height:2px; background:var(--parchment); margin:0.75rem 0 1.25rem; }
.disp-cards-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(340px,1fr)); gap:1.25rem; }
.disp-full-card { background:#fff; border:1px solid var(--stone); border-radius:14px; overflow:hidden; transition:box-shadow 0.2s,transform 0.2s; }
.disp-full-card:hover { box-shadow:0 8px 32px rgba(47,93,80,0.12); transform:translateY(-2px); }
.disp-full-card.perpetual { border-color:#b2d8bb; }
.dfc-header { padding:1.1rem 1.25rem 0.9rem; border-bottom:1px solid var(--parchment); display:flex; justify-content:space-between; align-items:flex-start; }
.dfc-name { font-family:'Lora',serif; font-size:1.05rem; font-weight:700; color:var(--pine); margin-bottom:0.15rem; }
.dfc-type { font-size:0.71rem; color:var(--moss); }
.dfc-badges { display:flex; flex-direction:column; align-items:flex-end; gap:5px; }
.badge-open   { background:#e8f5eb; color:var(--success); padding:0.2rem 0.55rem; border-radius:999px; font-size:0.63rem; font-weight:700; text-transform:uppercase; }
.badge-closed { background:#fdf0eb; color:var(--rust);    padding:0.2rem 0.55rem; border-radius:999px; font-size:0.63rem; font-weight:700; text-transform:uppercase; }
.badge-rec    { background:#e8f0fe; color:#1a4a9a;        padding:0.2rem 0.55rem; border-radius:999px; font-size:0.63rem; font-weight:700; }
.badge-recmed { background:#e8f5eb; color:var(--success); padding:0.2rem 0.55rem; border-radius:999px; font-size:0.63rem; font-weight:700; }
.dfc-body { padding:1rem 1.25rem; }
.dfc-row { display:flex; align-items:flex-start; gap:8px; font-size:0.8rem; margin-bottom:0.55rem; color:var(--bark); line-height:1.4; }
.dfc-row-icon { font-size:0.9rem; flex-shrink:0; margin-top:1px; }
.dfc-row-label { font-weight:600; color:var(--moss); min-width:64px; flex-shrink:0; }
.dfc-hours-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:0.25rem 1rem; margin-top:0.5rem; }
.dfc-day { display:flex; justify-content:space-between; font-size:0.75rem; color:var(--bark); padding:0.18rem 0; border-bottom:1px solid var(--parchment); }
.dfc-day:last-child { border-bottom:none; }
.dfc-day-name { color:var(--moss); }
.dfc-day.today .dfc-day-name { color:var(--forest); font-weight:700; }
.dfc-day.today .dfc-day-hours { color:var(--forest); font-weight:700; }
.dfc-price-strip { display:flex; gap:0.75rem; margin-top:0.75rem; flex-wrap:wrap; }
.dfc-price-item { background:var(--cream); border-radius:8px; padding:0.45rem 0.65rem; text-align:center; flex:1; min-width:70px; }
.dfc-price-cat { font-size:0.6rem; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; color:var(--moss); margin-bottom:2px; }
.dfc-price-val { font-family:'Lora',serif; font-size:0.88rem; font-weight:700; color:var(--pine); }
.dfc-footer { padding:0.75rem 1.25rem; background:var(--cream); border-top:1px solid var(--parchment); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; }
.dfc-amenities { display:flex; gap:0.4rem; flex-wrap:wrap; }
.amenity-tag { background:var(--parchment); color:var(--bark); border-radius:999px; padding:0.18rem 0.55rem; font-size:0.67rem; font-weight:500; }
.dfc-site-link { font-size:0.75rem; font-weight:600; color:var(--forest); text-decoration:none; }
.dfc-site-link:hover { color:var(--gold); }
.disp-stats-bar { display:grid; grid-template-columns:repeat(auto-fill,minmax(160px,1fr)); gap:1rem; background:#fff; border:1px solid var(--stone); border-radius:12px; padding:1.25rem 1.5rem; margin-bottom:2rem; }
.dsb-item { text-align:center; }
.dsb-val { font-family:'Lora',serif; font-size:1.6rem; font-weight:700; color:var(--pine); }
.dsb-lbl { font-size:0.68rem; text-transform:uppercase; letter-spacing:0.09em; color:var(--moss); margin-top:2px; }
@media(max-width:700px){
  .nav-links{display:none}
  .hero-stats{gap:1.5rem}
  .snapshot-grid{grid-template-columns:repeat(2,1fr)}
  .prod-card{flex-direction:column}
  .prod-img{width:100%;min-height:80px}
  .prod-price-col{flex-direction:row;align-items:center;min-width:0;padding-top:0}
  .deals-strip{grid-template-columns:1fr}
}
`;
const DISPS = [
  {id:1,  name:"Berkshire Roots",             town:"Pittsfield",       type:"Rec+Med",website:"https://berkshireroots.com",          open:true,  tax:false},
  {id:2,  name:"Temescal Wellness",           town:"Pittsfield",       type:"Rec+Med",website:"https://temescalwellness.com",         open:true,  tax:false},
  {id:3,  name:"HiBrid Co",                   town:"Pittsfield",       type:"Rec",    website:"https://hibridco.com",                 open:true,  tax:false},
  {id:4,  name:"Potency",                     town:"Pittsfield",       type:"Rec",    website:"https://getpotency.com",               open:true,  tax:false},
  {id:5,  name:"Budhaus Cannabis",            town:"Pittsfield",       type:"Rec",    website:"https://budha.us",                     open:false, tax:false},
  {id:6,  name:"Perpetual Dispensary",        town:"Pittsfield",       type:"Rec",    website:"https://perpetualdispensary.com",      open:true,  tax:true },
  {id:7,  name:"Clear Sky Cannabis",          town:"North Adams",      type:"Rec",    website:"https://clearskycannabis.com",         open:true,  tax:false},
  {id:8,  name:"Cannabis Culture",            town:"North Adams",      type:"Rec",    website:"https://cannabisculturema.com",        open:true,  tax:false},
  {id:9,  name:"Silver Therapeutics",         town:"North Adams",      type:"Rec",    website:"https://silver-therapeutics.com",      open:true,  tax:false},
  {id:10, name:"Theory Wellness",             town:"North Adams",      type:"Rec+Med",website:"https://theorywellness.org",           open:true,  tax:false},
  {id:11, name:"Theory Wellness",             town:"Great Barrington", type:"Rec+Med",website:"https://theorywellness.org",           open:true,  tax:false},
  {id:12, name:"Rebelle",                     town:"Great Barrington", type:"Rec",    website:"https://letsrebelle.com",              open:true,  tax:false},
  {id:13, name:"Farnsworth Fine Cannabis",    town:"Great Barrington", type:"Rec",    website:"https://farnsworthfinecannabis.com",   open:true,  tax:false},
  {id:14, name:"Great Barrington Dispensary", town:"Great Barrington", type:"Rec",    website:"https://greatbarringtondispensary.com",open:false, tax:false},
  {id:15, name:"Calyx Berkshire",             town:"Lee",              type:"Rec",    website:"https://calyxberkshire.com",           open:true,  tax:false},
  {id:16, name:"Canna Provisions",            town:"Lee",              type:"Rec",    website:"https://cannaprovisions.com",          open:true,  tax:false},
  {id:17, name:"Kapha Cannabis",              town:"Lenox",            type:"Rec",    website:"https://kaphacannabis.com",            open:true,  tax:false},
  {id:18, name:"The Pass Cannabis Co",        town:"Sheffield",        type:"Rec",    website:"https://thepass.co",                  open:true,  tax:false},
  {id:19, name:"Riverbend Cannabis",          town:"Sheffield",        type:"Rec",    website:"https://riverbendcannabis.com",        open:false, tax:false},
  {id:20, name:"Devine Cannabis",             town:"Egremont",         type:"Rec",    website:"https://devineberkshires.com",         open:true,  tax:false},
  {id:21, name:"Liberty Market",              town:"Lanesborough",     type:"Rec+Med",website:"https://lm420.com",                   open:true,  tax:false,  address:"290 South Main St, Lanesborough, MA 01237",  phone:"(413) 445-4200", hours:{Mon:"10am-8pm",Tue:"10am-8pm",Wed:"10am-8pm",Thu:"10am-8pm",Fri:"10am-9pm",Sat:"10am-9pm",Sun:"11am-7pm"}, amenities:["Online Ordering","Medical","Loyalty Program","Parking"], about:"Full-service Rec+Med dispensary serving the Lanesborough and Pittsfield area. Wide product selection and dedicated medical staff."},
];
const DISP_DETAIL = {
  1:  {address:"50 West Housatonic St, Pittsfield, MA 01201", phone:"(413) 997-1200", hours:{Mon:"9am-8pm",Tue:"9am-8pm",Wed:"9am-8pm",Thu:"9am-8pm",Fri:"9am-9pm",Sat:"9am-9pm",Sun:"10am-7pm"}, amenities:["Online Ordering","Medical","Loyalty Program","Parking","Delivery"], about:"Berkshire-born Rec+Med dispensary with an expansive local menu and strong roots in the community."},
  2:  {address:"464 Merrill Rd, Pittsfield, MA 01201",        phone:"(413) 464-2000", hours:{Mon:"10am-8pm",Tue:"10am-8pm",Wed:"10am-8pm",Thu:"10am-8pm",Fri:"10am-9pm",Sat:"10am-9pm",Sun:"11am-7pm"}, amenities:["Online Ordering","Medical","Parking"], about:"Regional Rec+Med chain with a clean, modern dispensary experience."},
  3:  {address:"100 Fenn St, Pittsfield, MA 01201",           phone:"(413) 442-4200", hours:{Mon:"10am-8pm",Tue:"10am-8pm",Wed:"10am-8pm",Thu:"10am-8pm",Fri:"10am-9pm",Sat:"10am-9pm",Sun:"11am-7pm"}, amenities:["Online Ordering","Loyalty Program","Parking"], about:"Pittsfield's hybrid cannabis boutique."},
  4:  {address:"180 North St, Pittsfield, MA 01201",          phone:"(413) 499-1000", hours:{Mon:"10am-8pm",Tue:"10am-8pm",Wed:"10am-8pm",Thu:"10am-8pm",Fri:"10am-9pm",Sat:"10am-9pm",Sun:"10am-7pm"}, amenities:["Online Ordering","Loyalty Program","Parking","ATM"], about:"Downtown Pittsfield rec shop known for daily featured strains."},
  5:  {address:"555 Dalton Ave, Pittsfield, MA 01201",        phone:"(413) 443-2870", hours:{Mon:"Closed",Tue:"11am-7pm",Wed:"11am-7pm",Thu:"11am-7pm",Fri:"11am-8pm",Sat:"11am-8pm",Sun:"12pm-6pm"}, amenities:["Parking","ATM"], about:"Neighborhood rec shop with a relaxed vibe and affordable pricing."},
  6:  {address:"297 North St, Pittsfield, MA 01201",          phone:"(413) 442-7700", hours:{Mon:"10am-9pm",Tue:"10am-9pm",Wed:"10am-9pm",Thu:"10am-9pm",Fri:"10am-10pm",Sat:"10am-10pm",Sun:"10am-8pm"}, amenities:["Online Ordering","Parking","ATM","Loyalty Program"], about:"Perpetual is unique in Berkshire County - menu prices are already tax-inclusive."},
  7:  {address:"100 Main St, North Adams, MA 01247",          phone:"(413) 664-4200", hours:{Mon:"10am-8pm",Tue:"10am-8pm",Wed:"10am-8pm",Thu:"10am-8pm",Fri:"10am-9pm",Sat:"10am-9pm",Sun:"11am-7pm"}, amenities:["Online Ordering","Parking","Loyalty Program"], about:"Bright, welcoming rec dispensary in downtown North Adams."},
  8:  {address:"222 Holden St, North Adams, MA 01247",        phone:"(413) 664-9900", hours:{Mon:"10am-8pm",Tue:"10am-8pm",Wed:"10am-8pm",Thu:"10am-8pm",Fri:"10am-9pm",Sat:"10am-9pm",Sun:"11am-7pm"}, amenities:["Parking","ATM","Loyalty Program"], about:"Community-focused shop in North Adams with rotating specials."},
  9:  {address:"136 American Legion Dr, North Adams, MA 01247",phone:"(413) 663-3500",hours:{Mon:"9am-8pm",Tue:"9am-8pm",Wed:"9am-8pm",Thu:"9am-8pm",Fri:"9am-9pm",Sat:"9am-9pm",Sun:"10am-7pm"}, amenities:["Online Ordering","Medical","Parking","Delivery"], about:"Rec and medical dispensary with a therapeutic focus."},
  10: {address:"15 Craft Ave, North Adams, MA 01247",         phone:"(413) 664-1234", hours:{Mon:"10am-8pm",Tue:"10am-8pm",Wed:"10am-8pm",Thu:"10am-8pm",Fri:"10am-9pm",Sat:"10am-9pm",Sun:"11am-7pm"}, amenities:["Online Ordering","Medical","Loyalty Program","Parking"], about:"Premium Rec+Med brand. North Adams location offers full medical program."},
  11: {address:"270 Stockbridge Rd, Great Barrington, MA 01230",phone:"(413) 528-1234",hours:{Mon:"10am-8pm",Tue:"10am-8pm",Wed:"10am-8pm",Thu:"10am-8pm",Fri:"10am-9pm",Sat:"10am-9pm",Sun:"11am-7pm"}, amenities:["Online Ordering","Medical","Parking","Loyalty Program"], about:"Theory Wellness Great Barrington. Same premium Rec+Med experience."},
  12: {address:"11 Railroad St, Great Barrington, MA 01230",  phone:"(413) 528-9900", hours:{Mon:"10am-7pm",Tue:"10am-7pm",Wed:"10am-7pm",Thu:"10am-7pm",Fri:"10am-8pm",Sat:"10am-8pm",Sun:"11am-6pm"}, amenities:["Online Ordering","Parking","Loyalty Program"], about:"Rebelle is Great Barrington's boutique cannabis experience."},
  13: {address:"321 Main St, Great Barrington, MA 01230",     phone:"(413) 528-3333", hours:{Mon:"10am-7pm",Tue:"10am-7pm",Wed:"10am-7pm",Thu:"10am-7pm",Fri:"10am-8pm",Sat:"10am-8pm",Sun:"11am-6pm"}, amenities:["Parking","Loyalty Program"], about:"Craft cannabis boutique in Great Barrington."},
  14: {address:"444 Stockbridge Rd, Great Barrington, MA 01230",phone:"(413) 528-0100",hours:{Mon:"Closed",Tue:"11am-7pm",Wed:"11am-7pm",Thu:"11am-7pm",Fri:"11am-8pm",Sat:"11am-8pm",Sun:"11am-6pm"}, amenities:["Parking","ATM"], about:"Local rec dispensary serving the southern Berkshires."},
  15: {address:"85 Main St, Lee, MA 01238",                   phone:"(413) 243-2400", hours:{Mon:"10am-8pm",Tue:"10am-8pm",Wed:"10am-8pm",Thu:"10am-8pm",Fri:"10am-9pm",Sat:"10am-9pm",Sun:"11am-7pm"}, amenities:["Online Ordering","Parking","Loyalty Program","ATM"], about:"Calyx Berkshire in Lee offers premium reserves alongside accessible pricing."},
  16: {address:"392 Main St, Lee, MA 01238",                  phone:"(413) 394-5000", hours:{Mon:"10am-8pm",Tue:"10am-8pm",Wed:"10am-8pm",Thu:"10am-8pm",Fri:"10am-9pm",Sat:"10am-9pm",Sun:"11am-7pm"}, amenities:["Online Ordering","Parking","Loyalty Program","Delivery","ATM"], about:"One of the best-value dispensaries in the county."},
  17: {address:"18 Housatonic St, Lenox, MA 01240",           phone:"(413) 637-4200", hours:{Mon:"10am-7pm",Tue:"10am-7pm",Wed:"10am-7pm",Thu:"10am-7pm",Fri:"10am-8pm",Sat:"10am-8pm",Sun:"11am-6pm"}, amenities:["Parking","Loyalty Program","Online Ordering"], about:"Lenox's only dispensary. Wellness-oriented product selection."},
  18: {address:"3 Crystal Hill Rd, Sheffield, MA 01257",      phone:"(413) 229-9000", hours:{Mon:"10am-7pm",Tue:"10am-7pm",Wed:"10am-7pm",Thu:"10am-7pm",Fri:"10am-8pm",Sat:"10am-8pm",Sun:"11am-6pm"}, amenities:["Online Ordering","Parking","Loyalty Program"], about:"Southern Berkshires rec shop known for quality concentrates."},
  19: {address:"180 South Main St, Sheffield, MA 01257",      phone:"(413) 229-4400", hours:{Mon:"Closed",Tue:"11am-6pm",Wed:"11am-6pm",Thu:"11am-6pm",Fri:"11am-7pm",Sat:"11am-7pm",Sun:"12pm-5pm"}, amenities:["Parking"], about:"Smaller Sheffield rec shop with limited hours."},
  20: {address:"111 Egremont Plain Rd, Egremont, MA 01230",   phone:"(413) 528-5500", hours:{Mon:"10am-7pm",Tue:"10am-7pm",Wed:"10am-7pm",Thu:"10am-7pm",Fri:"10am-8pm",Sat:"10am-8pm",Sun:"11am-6pm"}, amenities:["Parking","Online Ordering"], about:"Hidden gem in Egremont. Smaller, curated menu with friendly staff."},
  21: {address:"290 South Main St, Lanesborough, MA 01237",   phone:"(413) 445-4200", hours:{Mon:"10am-8pm",Tue:"10am-8pm",Wed:"10am-8pm",Thu:"10am-8pm",Fri:"10am-9pm",Sat:"10am-9pm",Sun:"11am-7pm"}, amenities:["Online Ordering","Medical","Loyalty Program","Parking"], about:"Full-service Rec+Med dispensary serving Lanesborough and Pittsfield."},
};
const finalPrice = (menuPrice, dispId) => {
  const d = DISPS.find(x=>x.id===dispId);
  return d && d.tax ? menuPrice : Math.round(menuPrice * 1.20);
};
const ppg = (finalP, sizeG) => sizeG ? `$${(finalP/sizeG).toFixed(2)}/g` : null;
const RAW_PRODUCTS = [
  {id:1,  cat:"flower", name:"Blue Dream",          brand:"House",             dispId:4,  menuPrice:26, sizeG:3.5,  thc:22, cbd:0.1, strain:"Sativa",  change:"down", onSale:false, terps:["Myrcene","Caryophyllene","Pinene"],    desc:"Classic daytime sativa with sweet berry notes.",    img:"\u{1F33F}", sku:"BD-38"},
  {id:2,  cat:"flower", name:"Wedding Cake",        brand:"House",             dispId:16, menuPrice:26, sizeG:3.5,  thc:26, cbd:0.0, strain:"Indica",  change:"down", onSale:false, terps:["Limonene","Caryophyllene","Linalool"],  desc:"Potent indica-dominant strain with rich, tangy flavor.",                   img:"\u{1F33F}", sku:"WC-38"},
  {id:3,  cat:"flower", name:"Gorilla Glue #4",     brand:"House",             dispId:8,  menuPrice:27, sizeG:3.5,  thc:24, cbd:0.0, strain:"Hybrid",  change:"flat", onSale:false, terps:["Myrcene","Limonene","Caryophyllene"],   desc:"Heavy-handed euphoria and relaxation. Earthy, piney, sour aroma.",                              img:"\u{1F33F}", sku:"GG4-38"},
  {id:4,  cat:"flower", name:"Purple Punch",        brand:"House",             dispId:3,  menuPrice:27, sizeG:3.5,  thc:20, cbd:0.1, strain:"Indica",  change:"down", onSale:false, terps:["Myrcene","Linalool","Ocimene"],         desc:"Grape Kool-Aid and blueberry muffin aroma.",                      img:"\u{1F33F}", sku:"PP-38"},
  {id:5,  cat:"flower", name:"Sour Diesel",         brand:"House",             dispId:21, menuPrice:27, sizeG:3.5,  thc:21, cbd:0.1, strain:"Sativa",  change:"flat", onSale:false, terps:["Terpinolene","Myrcene","Ocimene"],      desc:"Dreamy, energizing cerebral effect. Pungent diesel and lemon aroma.",                           img:"\u{1F33F}", sku:"SD-38"},
  {id:6,  cat:"flower", name:"OG Kush",             brand:"House",             dispId:1,  menuPrice:28, sizeG:3.5,  thc:19, cbd:0.0, strain:"Hybrid",  change:"down", onSale:false, terps:["Myrcene","Limonene","Caryophyllene"],   desc:"Legendary strain with complex earth, wood, and pine aroma.",              img:"\u{1F33F}", sku:"OGK-38"},
  {id:7,  cat:"flower", name:"Gelato #33",          brand:"House",             dispId:7,  menuPrice:28, sizeG:3.5,  thc:25, cbd:0.0, strain:"Hybrid",  change:"flat", onSale:false, terps:["Caryophyllene","Limonene","Linalool"],  desc:"Creamy, dessert-like aroma with a balance of relaxation and euphoria.",                         img:"\u{1F33F}", sku:"GL33-38"},
  {id:8,  cat:"flower", name:"Runtz",               brand:"House",             dispId:6,  menuPrice:35, sizeG:3.5,  thc:23, cbd:0.0, strain:"Hybrid",  change:"up",   onSale:false, terps:["Caryophyllene","Limonene","Linalool"],  desc:"Sweet, fruity candy aroma. Uplifting and euphoric.",                 img:"\u{1F33F}", sku:"RZ-38"},
  {id:9,  cat:"flower", name:"MAC 1",               brand:"House",             dispId:9,  menuPrice:29, sizeG:3.5,  thc:24, cbd:0.1, strain:"Hybrid",  change:"flat", onSale:false, terps:["Myrcene","Caryophyllene","Limonene"],   desc:"Miracle Alien Cookies. Creamy, herbal, earthy.",            img:"\u{1F33F}", sku:"MAC-38"},
  {id:10, cat:"flower", name:"Tropicana Cookies",   brand:"Berkshire Craft",   dispId:12, menuPrice:34, sizeG:3.5,  thc:27, cbd:0.0, strain:"Sativa",  change:"up",   onSale:false, terps:["Terpinolene","Ocimene","Myrcene"],      desc:"Tangy citrus flavor. Uplifting and motivating.",                 img:"\u{1F33F}", sku:"TC-38"},
  {id:11, cat:"flower", name:"Permanent Marker",    brand:"Premium Reserve",   dispId:15, menuPrice:33, sizeG:3.5,  thc:29, cbd:0.0, strain:"Indica",  change:"up",   onSale:false, terps:["Caryophyllene","Limonene","Myrcene"],   desc:"Pungent, fuel-forward with deeply relaxing effects.",                              img:"\u{1F33F}", sku:"PM-38"},
  {id:12, cat:"flower", name:"Cereal Milk",         brand:"House",             dispId:13, menuPrice:30, sizeG:3.5,  thc:23, cbd:0.1, strain:"Hybrid",  change:"flat", onSale:false, terps:["Caryophyllene","Linalool","Limonene"],  desc:"Creamy, sugary cereal flavor with balanced effects.",                    img:"\u{1F33F}", sku:"CM-38"},
  {id:30, cat:"preroll", name:"Blue Dream .5g",     brand:"House",             dispId:4,  menuPrice:6,  sizeG:0.5,  thc:22, cbd:0.0, strain:"Sativa",  change:"down", onSale:false, terps:["Myrcene","Pinene"],              desc:"Half-gram pre-roll of Blue Dream flower.",                         img:"\u{1F6AC}", sku:"BD-PR"},
  {id:31, cat:"preroll", name:"House Blend 1g",     brand:"House",             dispId:8,  menuPrice:6,  sizeG:1.0,  thc:19, cbd:0.0, strain:"Hybrid",  change:"flat", onSale:false, terps:["Myrcene","Caryophyllene"],       desc:"Full gram pre-roll of rotating house blend flower.",                                            img:"\u{1F6AC}", sku:"HB-PR"},
  {id:32, cat:"preroll", name:"Happy Hour .5g",     brand:"House",             dispId:6,  menuPrice:5,  sizeG:0.5,  thc:20, cbd:0.0, strain:"Sativa",  change:"flat", onSale:true,  terps:["Terpinolene","Limonene"],        desc:"Daily 4-6pm special. Tax-inclusive menu price.",                      img:"\u{1F6AC}", sku:"HH-PR"},
  {id:33, cat:"preroll", name:"Tuesday Special .5g",brand:"House",             dispId:21, menuPrice:5,  sizeG:0.5,  thc:18, cbd:0.0, strain:"Hybrid",  change:"flat", onSale:true,  terps:["Myrcene"],                      desc:"Every Tuesday - any single pre-roll on the menu at this price.",                                img:"\u{1F6AC}", sku:"TUE-PR"},
  {id:34, cat:"preroll", name:"OG Kush 1g",         brand:"House",             dispId:1,  menuPrice:7,  sizeG:1.0,  thc:19, cbd:0.0, strain:"Hybrid",  change:"flat", onSale:false, terps:["Myrcene","Limonene"],            desc:"House-rolled 1g OG Kush pre-roll. Smooth burn, earthy finish.",                                 img:"\u{1F6AC}", sku:"OGK-PR"},
  {id:35, cat:"preroll", name:"Gelato 5-Pack",      brand:"House",             dispId:16, menuPrice:22, sizeG:2.5,  thc:24, cbd:0.0, strain:"Hybrid",  change:"down", onSale:true,  terps:["Caryophyllene","Limonene"],      desc:"Five 0.5g Gelato pre-rolls. Great for sharing.",                                 img:"\u{1F6AC}", sku:"GL-5PK"},
  {id:36, cat:"preroll", name:"Mimosa 1g",          brand:"House",             dispId:17, menuPrice:8,  sizeG:1.0,  thc:20, cbd:0.1, strain:"Sativa",  change:"flat", onSale:false, terps:["Terpinolene","Ocimene"],         desc:"Light and citrusy. Great morning pre-roll.",                                          img:"\u{1F6AC}", sku:"MIM-PR"},
  {id:37, cat:"preroll", name:"Indica Select 1g",   brand:"House",             dispId:7,  menuPrice:6,  sizeG:1.0,  thc:21, cbd:0.0, strain:"Indica",  change:"flat", onSale:true,  terps:["Myrcene","Linalool"],            desc:"Rotating indica strain, selected daily.",                   img:"\u{1F6AC}", sku:"IND-PR"},
  {id:50, cat:"vape", name:".5g Distillate Cart",   brand:"HiBrid House",      dispId:3,  menuPrice:18, sizeG:0.5,  thc:78, cbd:1.0, strain:"Hybrid",  change:"down", onSale:true,  terps:["Limonene","Myrcene"],            desc:"Budget distillate cart. 6 strain options. Universal 510-thread.",                               img:"\u{1F4A8}", sku:"DIST-05"},
  {id:51, cat:"vape", name:".5g Live Resin Cart",   brand:"House",             dispId:4,  menuPrice:22, sizeG:0.5,  thc:82, cbd:0.5, strain:"Sativa",  change:"flat", onSale:false, terps:["Terpinolene","Ocimene"],         desc:"Full-spectrum live resin preserves original terpene profile.",           img:"\u{1F4A8}", sku:"LR-05"},
  {id:52, cat:"vape", name:".5g Disposable AIO",    brand:"The Pass",          dispId:18, menuPrice:20, sizeG:0.5,  thc:75, cbd:0.0, strain:"Hybrid",  change:"down", onSale:true,  terps:["Caryophyllene","Limonene"],      desc:"Rechargeable all-in-one disposable. No extra battery needed.",                                  img:"\u{1F4A8}", sku:"AIO-05"},
  {id:53, cat:"vape", name:"1g Live Resin Cart",    brand:"Berkshire Roots",   dispId:1,  menuPrice:28, sizeG:1.0,  thc:80, cbd:0.5, strain:"Indica",  change:"down", onSale:true,  terps:["Myrcene","Linalool","Caryophyllene"],desc:"Clearance pricing on 1g live resin carts.",                              img:"\u{1F4A8}", sku:"LR-1G"},
  {id:54, cat:"vape", name:".5g CDT Cart",          brand:"Canna Provisions",  dispId:16, menuPrice:23, sizeG:0.5,  thc:84, cbd:0.0, strain:"Sativa",  change:"flat", onSale:false, terps:["Pinene","Terpinolene","Limonene"],desc:"Cannabis-derived terpenes. True-to-strain flavor.",                                    img:"\u{1F4A8}", sku:"CDT-05"},
  {id:55, cat:"vape", name:"1g Distillate Cart",    brand:"House",             dispId:2,  menuPrice:25, sizeG:1.0,  thc:79, cbd:0.0, strain:"Hybrid",  change:"up",   onSale:false, terps:["Myrcene","Limonene"],            desc:"High-potency distillate in 1g format.",                      img:"\u{1F4A8}", sku:"DIST-1G"},
  {id:56, cat:"vape", name:".5g Rosin Cart",        brand:"Theory Wellness",   dispId:11, menuPrice:30, sizeG:0.5,  thc:70, cbd:1.5, strain:"Indica",  change:"flat", onSale:false, terps:["Myrcene","Caryophyllene"],       desc:"Solventless live rosin cartridge. Small batch, clean extraction.",                              img:"\u{1F4A8}", sku:"RSN-05"},
  {id:70, cat:"concentrate", name:"Live Resin - Blue Dream",  brand:"HiBrid",          dispId:3,  menuPrice:24, sizeG:1.0, thc:72, cbd:0.5, strain:"Sativa", change:"down", onSale:true,  terps:["Myrcene","Caryophyllene","Pinene"], desc:"Clearance live resin. Bright, sweet terpene profile.",                img:"\u{1F9EA}", sku:"LR-BD"},
  {id:71, cat:"concentrate", name:"Wax - OG Kush",           brand:"House",           dispId:16, menuPrice:28, sizeG:1.0, thc:74, cbd:0.0, strain:"Hybrid", change:"down", onSale:false, terps:["Myrcene","Limonene"],              desc:"Consistently high-potency wax. Smooth dab with earthy notes.",                          img:"\u{1F9EA}", sku:"WAX-OGK"},
  {id:72, cat:"concentrate", name:"Budder - Gelato",         brand:"House",           dispId:1,  menuPrice:32, sizeG:1.0, thc:70, cbd:0.0, strain:"Hybrid", change:"flat", onSale:false, terps:["Caryophyllene","Limonene","Linalool"],desc:"Whipped budder consistency. Smooth, creamy texture.",                       img:"\u{1F9EA}", sku:"BUD-GL"},
  {id:73, cat:"concentrate", name:"Rosin - Wedding Cake",    brand:"Calyx Reserve",   dispId:15, menuPrice:35, sizeG:1.0, thc:68, cbd:0.5, strain:"Indica", change:"up",   onSale:true,  terps:["Limonene","Caryophyllene"],        desc:"Single-source solventless rosin. Cold-pressed for maximum flavor.",                           img:"\u{1F9EA}", sku:"RSN-WC"},
  {id:74, cat:"concentrate", name:"Diamonds - Sour Diesel",  brand:"Theory Wellness", dispId:10, menuPrice:40, sizeG:1.0, thc:88, cbd:0.0, strain:"Sativa", change:"flat", onSale:false, terps:["Terpinolene","Myrcene","Ocimene"], desc:"THCA crystalline diamonds with terpene sauce. Ultra-potent.",                                 img:"\u{1F9EA}", sku:"DIA-SD"},
  {id:75, cat:"concentrate", name:"Hash - MAC 1",            brand:"The Pass",        dispId:18, menuPrice:30, sizeG:1.0, thc:60, cbd:1.0, strain:"Hybrid", change:"down", onSale:false, terps:["Myrcene","Caryophyllene"],         desc:"Bubble hash made from single-source material.",                 img:"\u{1F9EA}", sku:"HSH-MAC"},
  {id:90, cat:"edible", name:"10mg Gummies 5-Pack",       brand:"Silver Select",     dispId:9,  menuPrice:12, sizeG:null, thc:10, cbd:0.0, strain:"N/A",    change:"flat", onSale:true,  terps:[], desc:"Five 10mg fruit gummies. Assorted flavors.",                                img:"\u{1F36C}", sku:"GUM-5PK"},
  {id:91, cat:"edible", name:"100mg Chocolate Bar",       brand:"House",             dispId:16, menuPrice:15, sizeG:null, thc:null,cbd:0.0,strain:"N/A",    change:"down", onSale:false, terps:[], desc:"10-piece chocolate bar, 10mg per square.",                             img:"\u{1F36C}", sku:"CHOC-100"},
  {id:92, cat:"edible", name:"20mg Gummies 2-Pack",       brand:"House",             dispId:4,  menuPrice:12, sizeG:null, thc:20, cbd:0.0, strain:"N/A",    change:"flat", onSale:false, terps:[], desc:"Two 10mg gummies. Easy single-serving pack.",                                                  img:"\u{1F36C}", sku:"GUM-2PK"},
  {id:93, cat:"edible", name:"100mg Brownie",             brand:"House",             dispId:3,  menuPrice:15, sizeG:null, thc:null,cbd:0.0,strain:"N/A",    change:"flat", onSale:false, terps:[], desc:"Classic cannabis brownie. Fudgy, consistent 100mg dose.",                             img:"\u{1F36C}", sku:"BRW-100"},
  {id:94, cat:"edible", name:"25mg Mints 10-Pack",        brand:"House",             dispId:17, menuPrice:18, sizeG:null, thc:25, cbd:0.0, strain:"N/A",    change:"flat", onSale:false, terps:[], desc:"Discreet mint format. Each mint contains 25mg THC.",                                           img:"\u{1F36C}", sku:"MINT-10PK"},
  {id:95, cat:"edible", name:"200mg Caramel Chews",       brand:"Theory Select",     dispId:11, menuPrice:20, sizeG:null, thc:null,cbd:0.0,strain:"N/A",    change:"up",   onSale:false, terps:[], desc:"Chewy caramel candies, 20mg per piece. 10-piece bag.",                                         img:"\u{1F36C}", sku:"CAR-200"},
  {id:110,cat:"drink", name:"5mg Sparkling Water",        brand:"Canna Sip",         dispId:16, menuPrice:6,  sizeG:null, thc:5,  cbd:0.0, strain:"N/A",    change:"flat", onSale:false, terps:[], desc:"Lightly carbonated, zero sugar. Onset in 15-30 minutes.",                    img:"\u{1F964}", sku:"SPARK-5"},
  {id:111,cat:"drink", name:"10mg THC Lemonade",          brand:"Berkshire Bev",     dispId:4,  menuPrice:7,  sizeG:null, thc:10, cbd:0.0, strain:"N/A",    change:"flat", onSale:false, terps:[], desc:"Classic lemonade with 10mg THC. Non-alcoholic. 8oz can.",                                     img:"\u{1F964}", sku:"LEM-10"},
  {id:112,cat:"drink", name:"2.5mg Microdose Seltzer",    brand:"House",             dispId:3,  menuPrice:5,  sizeG:null, thc:2.5,cbd:2.5, strain:"N/A",    change:"down", onSale:false, terps:[], desc:"Microdose 1:1 seltzer, great for beginners.",                     img:"\u{1F964}", sku:"SEL-2.5"},
  {id:113,cat:"drink", name:"10mg CBD Sparkling Tea",     brand:"Kapha Botanicals",  dispId:17, menuPrice:7,  sizeG:null, thc:0,  cbd:10,  strain:"CBD",    change:"flat", onSale:false, terps:[], desc:"CBD-only sparkling tea. Non-intoxicating. Chamomile and mint.",                              img:"\u{1F964}", sku:"TEA-CBD"},
  {id:130,cat:"tincture", name:"1:1 CBD:THC Tincture",    brand:"Temescal",          dispId:2,  menuPrice:32, sizeG:null, thc:15, cbd:15,  strain:"CBD",    change:"flat", onSale:false, terps:[], desc:"Balanced 1:1 formula. 30ml bottle with dropper.",               img:"\u{1F4A7}", sku:"TIN-11"},
  {id:131,cat:"tincture", name:"High THC Tincture 500mg", brand:"Silver Therapeutics",dispId:9, menuPrice:35, sizeG:null, thc:null,cbd:0.0, strain:"Hybrid", change:"flat", onSale:false, terps:[], desc:"500mg total THC per 30ml. Fast-acting MCT oil base.",                  img:"\u{1F4A7}", sku:"TIN-HI"},
  {id:132,cat:"tincture", name:"CBD Relief Drops",        brand:"Liberty Botanicals", dispId:21,menuPrice:27, sizeG:null, thc:0,  cbd:20,  strain:"CBD",    change:"down", onSale:false, terps:[], desc:"CBD-dominant, zero THC. 30ml.",             img:"\u{1F4A7}", sku:"TIN-CBD"},
  {id:133,cat:"tincture", name:"RSO Syringe 1g",          brand:"House",              dispId:1, menuPrice:23, sizeG:null, thc:null,cbd:0.0, strain:"Indica", change:"flat", onSale:false, terps:[], desc:"Rick Simpson Oil. Whole-plant extract.",                  img:"\u{1F4A7}", sku:"RSO-1G"},
  {id:150,cat:"topical", name:"CBD Pain Relief Cream",    brand:"Kapha Wellness",    dispId:17, menuPrice:30, sizeG:null, thc:0,  cbd:250, strain:"CBD",    change:"flat", onSale:false, terps:[], desc:"250mg CBD topical cream with arnica and menthol. 2oz jar.",              img:"\u{1F9F4}", sku:"TOP-CBD"},
  {id:151,cat:"topical", name:"THC Body Lotion",          brand:"Theory Care",       dispId:11, menuPrice:33, sizeG:null, thc:null,cbd:0.0, strain:"N/A",   change:"flat", onSale:false, terps:[], desc:"Soothing 4oz body lotion.",           img:"\u{1F9F4}", sku:"LOT-THC"},
  {id:152,cat:"topical", name:"Transdermal Patch 20mg",   brand:"Silver Therapeutics",dispId:9, menuPrice:18, sizeG:null, thc:null,cbd:0.0, strain:"N/A",   change:"down", onSale:false, terps:[], desc:"72-hour transdermal patch. 20mg slow-release THC.",            img:"\u{1F9F4}", sku:"PATCH-20"},
  {id:170,cat:"accessory", name:"RAW Classic 1\u00BC Papers",      brand:"RAW",             dispId:4,  menuPrice:3,  sizeG:null, thc:null,cbd:null,strain:"N/A", change:"flat", onSale:false, terps:[], desc:"32 unbleached natural rolling papers per pack.",                                img:"\u{1F392}", sku:"RAW-125"},
  {id:171,cat:"accessory", name:"RAW Pre-Rolled Cones 6-Pack", brand:"RAW",             dispId:16, menuPrice:4,  sizeG:null, thc:null,cbd:null,strain:"N/A", change:"flat", onSale:false, terps:[], desc:"Six pre-rolled cones with tips included.",                     img:"\u{1F392}", sku:"RAW-CONE6"},
  {id:172,cat:"accessory", name:"Clipper Lighter",             brand:"Clipper",         dispId:8,  menuPrice:3,  sizeG:null, thc:null,cbd:null,strain:"N/A", change:"flat", onSale:false, terps:[], desc:"Refillable butane lighter with removable flint poker.",               img:"\u{1F525}", sku:"CLIP-LT"},
  {id:173,cat:"accessory", name:"4-Piece Grinder - Aluminum",  brand:"House",           dispId:3,  menuPrice:18, sizeG:null, thc:null,cbd:null,strain:"N/A", change:"flat", onSale:false, terps:[], desc:"Anodized aluminum 4-piece grinder with kief catcher. 55mm.",                  img:"\u2699\uFE0F", sku:"GRND-4PC"},
  {id:174,cat:"accessory", name:"510-Thread Battery",          brand:"House",           dispId:4,  menuPrice:12, sizeG:null, thc:null,cbd:null,strain:"N/A", change:"flat", onSale:false, terps:[], desc:"Variable voltage 510-thread vape battery. USB-C charging.",           img:"\u{1F50B}", sku:"BATT-510"},
  {id:175,cat:"accessory", name:"Pax Era Pod Battery",         brand:"PAX",             dispId:2,  menuPrice:20, sizeG:null, thc:null,cbd:null,strain:"N/A", change:"flat", onSale:false, terps:[], desc:"Slim Bluetooth-connected pod vaporizer.",               img:"\u{1F50B}", sku:"PAX-ERA"},
  {id:176,cat:"accessory", name:"Glass One-Hitter Chillum",    brand:"House",           dispId:6,  menuPrice:8,  sizeG:null, thc:null,cbd:null,strain:"N/A", change:"flat", onSale:false, terps:[], desc:"Simple glass chillum for quick, discreet sessions.",                    img:"\u{1FA88}", sku:"CHILL-GL"},
  {id:177,cat:"accessory", name:"Silicone Hand Pipe",          brand:"House",           dispId:9,  menuPrice:10, sizeG:null, thc:null,cbd:null,strain:"N/A", change:"down", onSale:false, terps:[], desc:"Indestructible silicone spoon pipe.",      img:"\u{1FA88}", sku:"SIL-PIPE"},
  {id:178,cat:"accessory", name:"Odor-Proof Bag - Small",      brand:"Stashlogix",      dispId:17, menuPrice:14, sizeG:null, thc:null,cbd:null,strain:"N/A", change:"flat", onSale:false, terps:[], desc:"Activated carbon lining blocks odors. Lockable zipper.", img:"\u{1F45C}", sku:"STASH-SM"},
  {id:179,cat:"accessory", name:"Rolling Tray - Medium",       brand:"RAW",             dispId:7,  menuPrice:12, sizeG:null, thc:null,cbd:null,strain:"N/A", change:"flat", onSale:false, terps:[], desc:"Medium metal rolling tray with curved edges.",                            img:"\u{1F392}", sku:"TRAY-MED"},
  {id:180,cat:"accessory", name:"Cleaning Kit - Isopropyl Wipes",brand:"House",         dispId:1,  menuPrice:7,  sizeG:null, thc:null,cbd:null,strain:"N/A", change:"flat", onSale:false, terps:[], desc:"10 pre-saturated isopropyl wipes for cleaning.",               img:"\u{1F9F9}", sku:"CLEAN-KIT"},
];
const PRODUCTS = RAW_PRODUCTS.map(p => ({
  ...p,
  finalP: finalPrice(p.menuPrice, p.dispId),
  ppgStr: ppg(finalPrice(p.menuPrice, p.dispId), p.sizeG),
}));
const CATEGORIES = [
  {key:"flower",      label:"Flower",        icon:"\u{1F33F}", unit:"per 1/8 oz", snapshot:true },
  {key:"preroll",     label:"Pre-Rolls",     icon:"\u{1F6AC}", unit:"each",        snapshot:true },
  {key:"vape",        label:"Vapes & Carts", icon:"\u{1F4A8}", unit:"per cart",    snapshot:true },
  {key:"concentrate", label:"Concentrates",  icon:"\u{1F9EA}", unit:"per gram",    snapshot:true },
  {key:"edible",      label:"Edibles",       icon:"\u{1F36C}", unit:"per pkg",     snapshot:true },
  {key:"drink",       label:"Drinks",        icon:"\u{1F964}", unit:"each",        snapshot:true },
  {key:"tincture",    label:"Tinctures",     icon:"\u{1F4A7}", unit:"per bottle",  snapshot:true },
  {key:"topical",     label:"Topicals",      icon:"\u{1F9F4}", unit:"per unit",    snapshot:true },
  {key:"accessory",   label:"Accessories",   icon:"\u{1F392}", unit:"each",        snapshot:false},
];
const SNAPSHOT = CATEGORIES.filter(c=>c.snapshot).map(cat => {
  const items = PRODUCTS.filter(p=>p.cat===cat.key).sort((a,b)=>a.finalP-b.finalP);
  if (!items.length) return null;
  const best = items[0];
  const disp = DISPS.find(d=>d.id===best.dispId);
  return { cat, best, disp };
}).filter(Boolean);
const DEALS = [
  {id:1, dispensary:"Clear Sky Cannabis",      town:"North Adams",      category:"preroll",     tag:"tag-preroll",  emoji:"\u{1F6AC}", title:"2-Pack Pre-Rolls - House Blend",       desc:"Two .5g house blend pre-rolls. Final price.",              salePrice:"$14", origPrice:"$18", perUnit:"$7 each",     savings:"22%", expiry:"Daily"},
  {id:2, dispensary:"Potency",                 town:"Pittsfield",       category:"preroll",     tag:"tag-preroll",  emoji:"\u{1F6AC}", title:"5-Pack Pre-Roll Bundle",               desc:"Five 0.5g pre-rolls - mixed strains. Tax included.",       salePrice:"$26", origPrice:"$36", perUnit:"$5.20 each",  savings:"28%", expiry:"Ongoing"},
  {id:3, dispensary:"HiBrid Co",               town:"Pittsfield",       category:"vape",        tag:"tag-vape",     emoji:"\u{1F4A8}", title:".5g Distillate Cart - Budget Line",    desc:"6 strain options. Final out-the-door price.",              salePrice:"$22", origPrice:"$30", perUnit:"$22 each",    savings:"27%", expiry:"Ongoing"},
  {id:4, dispensary:"Berkshire Roots",         town:"Pittsfield",       category:"vape",        tag:"tag-vape",     emoji:"\u{1F4A8}", title:"1g Live Resin Cart - Clearance",       desc:"Select strains. While supply lasts.",                      salePrice:"$34", origPrice:"$54", perUnit:"$34 each",    savings:"37%", expiry:"While supply lasts"},
  {id:5, dispensary:"Canna Provisions",        town:"Lee",              category:"flower",      tag:"tag-flower",   emoji:"\u{1F33F}", title:"Mix & Match Ounce",                    desc:"Build your own ounce from select strains.",                salePrice:"$144",origPrice:"$202",perUnit:"$36/8th equiv",savings:"29%", expiry:"This week"},
  {id:6, dispensary:"Silver Therapeutics",     town:"North Adams",      category:"edible",      tag:"tag-edible",   emoji:"\u{1F36C}", title:"10mg Gummy 5-Pack",                    desc:"Assorted flavors. Out-the-door price.",                    salePrice:"$14", origPrice:"$22", perUnit:"$2.80 each",  savings:"36%", expiry:"Ongoing"},
  {id:7, dispensary:"HiBrid Co",               town:"Pittsfield",       category:"concentrate", tag:"tag-concentrate",emoji:"\u{1F9EA}",title:"Concentrate Clearance - Up to 40% Off",desc:"Live resin, rosin & wax. Tax included.",                  salePrice:"From $29",origPrice:"$48+",perUnit:null,         savings:"40%", expiry:"While supply lasts"},
  {id:8, dispensary:"Berkshire Roots",         town:"Pittsfield",       category:"store",       tag:"tag-store",    emoji:"\u{1F3F7}\uFE0F", title:"Locals Tuesday - 15% Off Everything", desc:"MA ID required. Tax applied after discount.",              salePrice:"15% off",origPrice:null,perUnit:null,          savings:"15%", expiry:"Every Tue"},
  {id:9, dispensary:"Farnsworth Fine Cannabis",town:"Great Barrington", category:"store",       tag:"tag-store",    emoji:"\u{1F389}", title:"First-Time Customer - 20% Off",        desc:"New customers 20% off first visit.",                       salePrice:"20% off",origPrice:null,perUnit:null,          savings:"20%", expiry:"One-time"},
];
const TOWNS   = ["All Towns","Pittsfield","North Adams","Great Barrington","Lee","Lenox","Sheffield","Egremont","Lanesborough"];
const STRAINS = ["All Strains","Sativa","Indica","Hybrid","CBD"];
const SORT_OPTIONS = [
  {key:"price_asc",  label:"Lowest Price"},
  {key:"price_desc", label:"Highest Price"},
  {key:"thc_desc",   label:"Highest THC%"},
  {key:"thc_asc",    label:"Lowest THC%"},
  {key:"ppg_asc",    label:"Best Value ($/g)"},
];
const strainPill = s => {
  const map = {Sativa:"pill-sativa",Indica:"pill-indica",Hybrid:"pill-hybrid",CBD:"pill-cbd"};
  return map[s]||"pill-na";
};
const thcClass = thc => thc >= 28 ? "thc-high" : thc >= 20 ? "thc-mid" : "thc-low";
const chSymbol = c => c==="down"?"\u2193":c==="up"?"\u2191":"\u2014";
const chClass  = c => c==="down"?"ch-down":c==="up"?"ch-up":"ch-flat";
export default function App() {
  const [page,       setPage]       = useState("home");
  const [activeCat,  setActiveCat]  = useState("flower");
  const [sortKey,    setSortKey]    = useState("price_asc");
  const [filterTown, setFilterTown] = useState("All Towns");
  const [filterStrain,setFilterStrain] = useState("All Strains");
  const [filterDisp, setFilterDisp] = useState("All Dispensaries");
  const [filterSale, setFilterSale] = useState(false);
  const [searchQ,    setSearchQ]    = useState("");
  const [ddOpen,     setDdOpen]     = useState(false);
  const [budgetRange,setBudgetRange] = useState("all");
  const [dispTown,   setDispTown]    = useState("All Towns");
  const [dispSearch, setDispSearch]  = useState("");
  const [secAgo,     setSecAgo]     = useState(0);
  const [lastUpd,    setLastUpd]    = useState("just now");
  const ddRef = useRef(null);
  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = FONTS + CSS;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);
  useEffect(() => {
    const iv = setInterval(() => {
      setSecAgo(s => {
        const n = s >= 180 ? 0 : s + 1;
        setLastUpd(n===0?"just now":n<60?`${n}s ago`:`${Math.floor(n/60)}m ago`);
        return n;
      });
    }, 1000);
    return () => clearInterval(iv);
  }, []);
  useEffect(() => {
    const handler = e => { if (ddRef.current && !ddRef.current.contains(e.target)) setDdOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  const goToPrices = cat => {
    setActiveCat(cat);
    setPage("prices");
    setDdOpen(false);
    setSortKey("price_asc");
    setFilterTown("All Towns");
    setFilterStrain("All Strains");
    setFilterDisp("All Dispensaries");
    setFilterSale(false);
    setSearchQ("");
  };
  const dispNames = ["All Dispensaries", ...new Set(PRODUCTS.filter(p=>p.cat===activeCat).map(p=>DISPS.find(d=>d.id===p.dispId)?.name||""))];
  const filtered = PRODUCTS.filter(p => {
    if (p.cat !== activeCat) return false;
    if (filterTown !== "All Towns") {
      const d = DISPS.find(x=>x.id===p.dispId);
      if (!d || d.town !== filterTown) return false;
    }
    if (filterDisp !== "All Dispensaries") {
      const d = DISPS.find(x=>x.id===p.dispId);
      if (!d || d.name !== filterDisp) return false;
    }
    if (filterStrain !== "All Strains" && p.strain !== filterStrain) return false;
    if (filterSale && !p.onSale) return false;
    if (searchQ) {
      const q = searchQ.toLowerCase();
      const d = DISPS.find(x=>x.id===p.dispId);
      if (!p.name.toLowerCase().includes(q) && !p.brand.toLowerCase().includes(q) && !(d?.name.toLowerCase().includes(q))) return false;
    }
    return true;
  }).sort((a,b) => {
    if (sortKey==="price_asc")  return a.finalP - b.finalP;
    if (sortKey==="price_desc") return b.finalP - a.finalP;
    if (sortKey==="thc_desc")   return (b.thc||0) - (a.thc||0);
    if (sortKey==="thc_asc")    return (a.thc||0) - (b.thc||0);
    if (sortKey==="ppg_asc") {
      const ag = a.sizeG ? a.finalP/a.sizeG : 9999;
      const bg = b.sizeG ? b.finalP/b.sizeG : 9999;
      return ag - bg;
    }
    return 0;
  });
  const openCount = DISPS.filter(d=>d.open).length;
  const catMeta = CATEGORIES.find(c=>c.key===activeCat);
  return (
    <div>
      <div className="grain"/>
      <nav>
        <div className="nav-logo" onClick={()=>setPage("home")}>{"\u{1F33F}"} The Berkshire <span>Buds</span></div>
        <div className="nav-links">
          <div className="nav-item" ref={ddRef}>
            <button className={`nav-btn${page==="prices"?" active":""} ${ddOpen?"open":""}`}
              onClick={()=>setDdOpen(o=>!o)}>
              Prices
              <svg viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 1l4 4 4-4"/></svg>
            </button>
            {ddOpen && (
              <div className="dropdown">
                {CATEGORIES.map(c=>(
                  <div key={c.key} className={`dd-item${activeCat===c.key&&page==="prices"?" active":""}`} onClick={()=>goToPrices(c.key)}>
                    <span className="dd-icon">{c.icon}</span>{c.label}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button className={`nav-btn${page==="budget"?" active":""}`} onClick={()=>setPage("budget")}>Budget</button>
          <button className={`nav-btn${page==="dispensaries"?" active":""}`} onClick={()=>setPage("dispensaries")}>Dispensaries</button>
          <button className={`nav-btn${page==="deals"?" active":""}`} onClick={()=>setPage("deals")}>
            Deals
            <span style={{background:"var(--gold)",color:"var(--pine)",borderRadius:"999px",padding:"0.08rem 0.4rem",fontSize:"0.65rem",fontWeight:700}}>{DEALS.length}</span>
          </button>
          <button className="nav-btn">Map</button>
        </div>
      </nav>
      <div className="live-bar">
        <div className="live-label"><span className="live-dot"/>Prices updated {lastUpd} {"\u2014"} refreshes every ~3 minutes</div>
        <div><span className="live-count">{openCount} of {DISPS.length}</span> dispensaries open now {"\u00B7"} Berkshire County, MA</div>
      </div>
      {page==="home" && (
        <div className="fadeIn">
          <div className="hero">
            <div className="hero-inner">
              <div className="hero-eyebrow">Berkshire County, MA {"\u00B7"} Real-Time Cannabis Prices</div>
              <h1>The Berkshires' best<br/><em>cannabis prices,</em> live.</h1>
              <p>Final out-the-door prices from all 21 Berkshire County dispensaries {"\u2014"} MA tax included. Find the cheapest option in every category before you leave the house.</p>
              <div className="hero-search">
                <input placeholder="Search strain, brand, or dispensary..." value={searchQ} onChange={e=>setSearchQ(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&searchQ){setPage("prices");}}}/>
                <button onClick={()=>{if(searchQ)setPage("prices");}}>Search</button>
              </div>
              <div className="hero-stats">
                <div><div className="stat-val">21</div><div className="stat-lbl">Dispensaries</div></div>
                <div><div className="stat-val">{PRODUCTS.length}</div><div className="stat-lbl">Products Tracked</div></div>
                <div><div className="stat-val">{DEALS.length}</div><div className="stat-lbl">Active Deals</div></div>
                <div><div className="stat-val">~3m</div><div className="stat-lbl">Refresh Rate</div></div>
              </div>
            </div>
          </div>
          <div className="section">
            <div className="section-label">Live Pricing Snapshot</div>
            <div className="section-title">Cheapest price per category {"\u2014"} right now</div>
            <div className="section-sub">Final out-the-door prices including 20% MA cannabis tax. Click any category to see all products & compare.</div>
            <div className="snapshot-grid">
              {SNAPSHOT.map(({cat, best, disp}) => (
                <div className="snap-card" key={cat.key} onClick={()=>goToPrices(cat.key)}>
                  {best.onSale && <span className="snap-tag">SALE</span>}
                  <div className="snap-cat-row">
                    <span className="snap-icon">{cat.icon}</span>
                    <span className="snap-cat-name">{cat.label}</span>
                  </div>
                  <div className="snap-price">${best.finalP}</div>
                  <div className="snap-product-name">{best.name}</div>
                  <div className="snap-disp">@ {disp?.name} {"\u00B7"} {disp?.town}</div>
                  <div className="snap-link">View all {cat.label.toLowerCase()} {"\u2192"}</div>
                </div>
              ))}
            </div>
            <div style={{marginTop:"1.5rem"}}>
              <div className="tax-notice">
                <span style={{fontSize:"1rem",flexShrink:0}}>{"\u{1F9FE}"}</span>
                <div><strong>All prices include 20% MA recreational cannabis tax {"\u2014"} what you actually pay at checkout.</strong> Exception: <strong>Perpetual Dispensary</strong> <span className="badge-no-tax">Tax Already in Menu</span> menus already include tax, shown as-is.</div>
              </div>
            </div>
          </div>
          <div style={{background:"var(--parchment)",borderTop:"1px solid var(--stone)",borderBottom:"1px solid var(--stone)"}}>
            <div className="section" style={{paddingTop:"2.5rem",paddingBottom:"2.5rem"}}>
              <div className="section-label">Active Deals</div>
              <div style={{display:"flex",alignItems:"baseline",justifyContent:"space-between",marginBottom:"1.5rem",gap:"1rem",flexWrap:"wrap"}}>
                <div className="section-title" style={{marginBottom:0}}>Today's best deals across the county</div>
                <button onClick={()=>setPage("deals")} style={{background:"var(--forest)",color:"#fff",border:"none",borderRadius:"8px",padding:"0.5rem 1.1rem",fontSize:"0.78rem",fontWeight:600,cursor:"pointer",fontFamily:"'Inter',sans-serif",whiteSpace:"nowrap"}}>See all {DEALS.length} deals {"\u2192"}</button>
              </div>
              <div className="deals-strip">
                {DEALS.slice(0,6).map(deal => (
                  <div className="deal-card" key={deal.id}>
                    {parseInt(deal.savings)>=25 && <div className="deal-savings-badge">Save {deal.savings}</div>}
                    <div className="deal-body">
                      <div className="deal-disp-row"><span>{deal.emoji}</span>{deal.dispensary} {"\u00B7"} {deal.town}</div>
                      <div className="deal-title">{deal.title}</div>
                      <div className="deal-desc">{deal.desc}</div>
                      {deal.salePrice && (
                        <div className="deal-prices">
                          <span className="deal-final">{deal.salePrice}</span>
                          {deal.origPrice && <span className="deal-orig">{deal.origPrice}</span>}
                          {deal.perUnit && <span className="deal-per">{"\u00B7"} {deal.perUnit}</span>}
                        </div>
                      )}
                    </div>
                    <div className="deal-footer">
                      <span>{"\u23F1"} {deal.expiry}</span>
                      <a className="deal-link" href={DISPS.find(d=>d.name===deal.dispensary)?.website||"#"} target="_blank" rel="noopener noreferrer">Get deal {"\u2192"}</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {page==="prices" && (
        <div className="prices-wrap fadeIn">
          <div style={{display:"flex",gap:"0.4rem",flexWrap:"wrap",padding:"1.25rem 0 0"}}>
            {CATEGORIES.map(c=>(
              <button key={c.key}
                className={`fs-chip${activeCat===c.key?" on":""}`}
                style={{display:"flex",alignItems:"center",gap:"5px"}}
                onClick={()=>goToPrices(c.key)}>
                {c.icon} {c.label}
              </button>
            ))}
          </div>
          <div className="prices-header" style={{marginTop:"1.25rem"}}>
            <h2>{catMeta?.icon} {catMeta?.label}</h2>
            <p>Final out-the-door prices (20% MA tax included) {"\u00B7"} {catMeta?.unit} {"\u00B7"} {filtered.length} results</p>
          </div>
          <div className="tax-notice" style={{marginBottom:"1.25rem"}}>
            <span style={{fontSize:"1rem",flexShrink:0}}>{"\u{1F9FE}"}</span>
            <div><strong>All prices include 20% MA tax.</strong> Exception: <strong>Perpetual Dispensary</strong> <span className="badge-no-tax">Tax Already in Menu</span></div>
          </div>
          <div className="filter-strip">
            <span className="fs-label">Sort</span>
            <select className="fs-select" value={sortKey} onChange={e=>setSortKey(e.target.value)}>
              {SORT_OPTIONS.map(o=><option key={o.key} value={o.key}>{o.label}</option>)}
            </select>
            <div className="fs-divider"/>
            <span className="fs-label">Filter</span>
            <select className="fs-select" value={filterTown} onChange={e=>setFilterTown(e.target.value)}>
              {TOWNS.map(t=><option key={t}>{t}</option>)}
            </select>
            <select className="fs-select" value={filterDisp} onChange={e=>setFilterDisp(e.target.value)}>
              {dispNames.map(n=><option key={n}>{n}</option>)}
            </select>
            {(activeCat==="flower"||activeCat==="preroll"||activeCat==="vape"||activeCat==="concentrate") && (
              <select className="fs-select" value={filterStrain} onChange={e=>setFilterStrain(e.target.value)}>
                {STRAINS.map(s=><option key={s}>{s}</option>)}
              </select>
            )}
            <label style={{display:"flex",alignItems:"center",gap:5,fontSize:"0.75rem",color:"var(--bark)",cursor:"pointer",userSelect:"none"}}>
              <input type="checkbox" checked={filterSale} onChange={e=>setFilterSale(e.target.checked)} style={{accentColor:"var(--forest)"}}/>
              On sale
            </label>
            <div className="fs-divider"/>
            <input className="fs-search" placeholder="Search product, brand..." value={searchQ} onChange={e=>setSearchQ(e.target.value)}/>
            <span className="fs-count">{filtered.length} results</span>
          </div>
          <div className="product-list">
            {filtered.map((p, idx) => {
              const disp = DISPS.find(d=>d.id===p.dispId);
              const isBest = idx===0;
              return (
                <div key={p.id} className={`prod-card${isBest?" best-card":""}`}>
                  <div className="prod-img">
                    {isBest && <div className="best-badge">Best Price</div>}
                    <span className="prod-rank">#{idx+1}</span>
                    {p.onSale && <span className="sale-badge">SALE</span>}
                    <span style={{fontSize:"2.2rem"}}>{p.img}</span>
                  </div>
                  <div className="prod-body">
                    <div className="prod-main">
                      <div className="prod-top-row">
                        <div>
                          <div className="prod-name">{p.name}</div>
                          <div className="prod-brand">{p.brand}</div>
                        </div>
                      </div>
                      <div className="prod-desc">{p.desc}</div>
                      <div className="prod-meta-row">
                        {p.strain && p.strain !== "N/A" && (
                          <span className={`meta-pill ${strainPill(p.strain)}`}>{p.strain}</span>
                        )}
                        {p.sizeG && <span className="meta-pill pill-size">{p.sizeG}g</span>}
                        <span className={`meta-pill ${chClass(p.change)}`} style={{background:"transparent",paddingLeft:0}}>{chSymbol(p.change)} price</span>
                      </div>
                      {p.terps && p.terps.length > 0 && (
                        <div className="terp-row">
                          {p.terps.map(t=><span key={t} className="terp-chip">{"\u{1F331}"} {t}</span>)}
                        </div>
                      )}
                      <div className="prod-disp-row">
                        <strong>{disp?.name}</strong>
                        <span>{"\u00B7"}</span>
                        <span>{"\u{1F4CD}"} {disp?.town}, MA</span>
                        <span>{"\u00B7"}</span>
                        <span style={{color:disp?.open?"var(--success)":"var(--rust)",fontWeight:600,fontSize:"0.71rem"}}>
                          {disp?.open?"\u25CF Open":"\u25CF Closed"}
                        </span>
                        <span>{"\u00B7"}</span>
                        <span className="updated-ts">Updated ~{lastUpd}</span>
                      </div>
                    </div>
                    <div className="prod-price-col">
                      <div>
                        <div className={`price-final${isBest?" best-price":""}`}>${p.finalP}</div>
                        <div className="price-sub">w/ tax {"\u00B7"} {p.unit||catMeta?.unit}</div>
                        {disp && !disp.tax && <div className="price-menu">Menu: ${p.menuPrice}</div>}
                        {p.ppgStr && <div className="ppg-tag">{p.ppgStr}</div>}
                      </div>
                      <div>
                        <div className="thc-cbd-row">
                          {p.thc !== null && p.thc !== undefined && (
                            <span className={`thc-badge ${thcClass(p.thc)}`}>
                              {p.thc === 0 ? "< 1%" : `${p.thc}% THC`}
                            </span>
                          )}
                          {p.cbd > 0 && (
                            <span className="cbd-badge">{p.cbd}% CBD</span>
                          )}
                        </div>
                        <a className="prod-link" href={disp?.website||"#"} target="_blank" rel="noopener noreferrer">
                          View at {disp?.name?.split(" ")[0]} {"\u2192"}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {filtered.length===0 && (
              <div style={{background:"#fff",border:"1px solid var(--stone)",borderRadius:"12px",padding:"3rem",textAlign:"center",color:"var(--moss)"}}>
                No products found. Try adjusting your filters.
              </div>
            )}
          </div>
        </div>
      )}
      {page==="deals" && (
        <div className="section fadeIn">
          <div className="section-label">Active Deals & Specials</div>
          <div className="section-title" style={{marginBottom:"0.3rem"}}>All deals across Berkshire County</div>
          <div className="section-sub">{DEALS.length} deals active {"\u00B7"} all final prices include 20% MA tax</div>
          <div className="deals-strip">
            {DEALS.map(deal=>(
              <div className="deal-card" key={deal.id}>
                {parseInt(deal.savings)>=25 && <div className="deal-savings-badge">Save {deal.savings}</div>}
                <div className="deal-body">
                  <div className="deal-disp-row"><span>{deal.emoji}</span>{deal.dispensary} {"\u00B7"} {deal.town}</div>
                  <div className="deal-title">{deal.title}</div>
                  <div className="deal-desc">{deal.desc}</div>
                  {deal.salePrice && (
                    <div className="deal-prices">
                      <span className="deal-final">{deal.salePrice}</span>
                      {deal.origPrice && <span className="deal-orig">{deal.origPrice}</span>}
                      {deal.perUnit && <span className="deal-per">{"\u00B7"} {deal.perUnit}</span>}
                    </div>
                  )}
                  <div className="deal-tags"><span className={`deal-tag ${deal.tag}`}>{deal.category}</span></div>
                </div>
                <div className="deal-footer">
                  <span>{"\u23F1"} {deal.expiry}</span>
                  <a className="deal-link" href={DISPS.find(d=>d.name===deal.dispensary)?.website||"#"} target="_blank" rel="noopener noreferrer">Get deal {"\u2192"}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {page==="budget" && (() => {
        const RANGES = [
          {key:"all",    label:"All",       min:0,   max:Infinity},
          {key:"u5",     label:"Under $5",  min:0,   max:4.99},
          {key:"5to10",  label:"$5 \u2013 $10",  min:5,   max:10},
          {key:"10to20", label:"$10 \u2013 $20", min:10.01,max:20},
          {key:"20to35", label:"$20 \u2013 $35", min:20.01,max:35},
          {key:"35to50", label:"$35 \u2013 $50", min:35.01,max:50},
          {key:"50plus", label:"$50+",      min:50.01,max:Infinity},
        ];
        const activeRanges = budgetRange==="all" ? RANGES.slice(1) : [RANGES.find(r=>r.key===budgetRange)];
        const budgetProducts = [...PRODUCTS].filter(p => p.cat !== "accessory").sort((a,b) => a.finalP - b.finalP);
        const catMap = CATEGORIES.reduce((a,c)=>{a[c.key]=c;return a;},{});
        return (
          <div className="budget-wrap fadeIn">
            <div className="budget-hero">
              <div>
                <div className="budget-hero-title">{"\u{1F3F7}\uFE0F"} Budget Finder</div>
                <div className="budget-hero-sub">Every product across all 21 dispensaries, sorted by final price including tax</div>
              </div>
              <div className="budget-range-nav">
                {RANGES.map(r=>(
                  <button key={r.key} className={`brange-btn${budgetRange===r.key?" on":""}`} onClick={()=>setBudgetRange(r.key)}>{r.label}</button>
                ))}
              </div>
            </div>
            <div className="tax-notice" style={{marginBottom:"1.5rem"}}>
              <span style={{fontSize:"1rem",flexShrink:0}}>{"\u{1F9FE}"}</span>
              <div><strong>All prices are final out-the-door totals with 20% MA tax included.</strong> Exception: <strong>Perpetual Dispensary</strong> <span className="badge-no-tax">Tax Already in Menu</span></div>
            </div>
            {activeRanges.map(range => {
              const items = budgetProducts.filter(p => p.finalP >= range.min && p.finalP <= range.max);
              return (
                <div className="budget-section" key={range.key}>
                  <div className="budget-section-header">
                    <span className="budget-range-label">{range.label}</span>
                    <span className="budget-range-count">{items.length} product{items.length!==1?"s":""}</span>
                  </div>
                  {items.length===0
                    ? <div className="empty-range">No products in this price range right now.</div>
                    : <div className="budget-grid">
                        {items.map(p => {
                          const disp = DISPS.find(d=>d.id===p.dispId);
                          const cat  = catMap[p.cat];
                          return (
                            <div key={p.id} className="budget-card">
                              <div className="budget-card-price">
                                <div className="bcp-amount">${p.finalP}</div>
                                <div className="bcp-tax">w/ tax</div>
                              </div>
                              <div className="budget-card-body">
                                <div className="budget-card-img">{p.img}</div>
                                <div className="budget-card-info">
                                  <div className="bci-name">{p.name}</div>
                                  <div className="bci-brand">{p.brand}</div>
                                  <div className="bci-meta">
                                    <span className="budget-cat-tag">{cat?.icon} {cat?.label}</span>
                                    {p.strain && p.strain!=="N/A" && <span className={`meta-pill ${strainPill(p.strain)}`}>{p.strain}</span>}
                                    {p.thc > 0 && <span className={`thc-badge ${thcClass(p.thc)}`}>{p.thc}%</span>}
                                    {p.onSale && <span style={{background:"#fef3e2",color:"#8a5000",borderRadius:"999px",padding:"0.12rem 0.4rem",fontSize:"0.62rem",fontWeight:700}}>SALE</span>}
                                  </div>
                                </div>
                              </div>
                              <div className="budget-card-right">
                                <div className="bcr-disp">{disp?.name}</div>
                                <div className="bcr-town">{"\u{1F4CD}"} {disp?.town}</div>
                                <a className="bcr-link" onClick={()=>goToPrices(p.cat)}>See all {"\u2192"}</a>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                  }
                </div>
              );
            })}
          </div>
        );
      })()}
      {page==="dispensaries" && (() => {
        const TOWNS_LIST = ["All Towns",...new Set(DISPS.map(d=>d.town))];
        const openDisps  = DISPS.filter(d=>d.open).length;
        const dayNames   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
        const today      = dayNames[new Date().getDay()];
        const visibleDisps = DISPS.filter(d => {
          if (dispTown !== "All Towns" && d.town !== dispTown) return false;
          if (dispSearch) {
            const q = dispSearch.toLowerCase();
            if (!d.name.toLowerCase().includes(q) && !d.town.toLowerCase().includes(q)) return false;
          }
          return true;
        });
        const townGroups = [...new Set(visibleDisps.map(d=>d.town))];
        return (
          <div className="disp-page-wrap fadeIn">
            <div className="disp-page-header">
              <h2>Berkshire County Dispensaries</h2>
              <p>All 21 cannabis dispensaries across 8 towns {"\u2014"} hours, locations, amenities, and live pricing</p>
            </div>
            <div className="disp-stats-bar">
              <div className="dsb-item"><div className="dsb-val">{DISPS.length}</div><div className="dsb-lbl">Total Dispensaries</div></div>
              <div className="dsb-item"><div className="dsb-val" style={{color:"var(--success)"}}>{openDisps}</div><div className="dsb-lbl">Open Right Now</div></div>
              <div className="dsb-item"><div className="dsb-val">{DISPS.filter(d=>d.type==="Rec+Med").length}</div><div className="dsb-lbl">Rec + Medical</div></div>
              <div className="dsb-item"><div className="dsb-val">8</div><div className="dsb-lbl">Towns Covered</div></div>
              <div className="dsb-item"><div className="dsb-val">{DISPS.filter(d=>DISP_DETAIL[d.id]?.amenities?.includes("Delivery")).length}</div><div className="dsb-lbl">Offer Delivery</div></div>
            </div>
            <div className="disp-filter-bar">
              <input className="fs-search" style={{minWidth:200}} placeholder="Search dispensary..." value={dispSearch} onChange={e=>setDispSearch(e.target.value)}/>
              <div className="disp-town-tabs" style={{margin:0}}>
                {TOWNS_LIST.map(t=>(
                  <button key={t} className={`dtt-btn${dispTown===t?" on":""}`} onClick={()=>setDispTown(t)}>{t}</button>
                ))}
              </div>
            </div>
            {townGroups.map(town => {
              const townDisps = visibleDisps.filter(d=>d.town===town);
              return (
                <div className="town-section" key={town}>
                  <div className="town-section-label">
                    {"\u{1F4CD}"} {town}
                    <span className="town-disp-count">{townDisps.length} dispensar{townDisps.length!==1?"ies":"y"}</span>
                  </div>
                  <div className="town-divider"/>
                  <div className="disp-cards-grid">
                    {townDisps.map(d => {
                      const detail = DISP_DETAIL[d.id] || {};
                      const hrs = detail.hours || {};
                      const dispProds = PRODUCTS.filter(p=>p.dispId===d.id);
                      const flowerPrices = dispProds.filter(p=>p.cat==="flower").map(p=>p.finalP);
                      const ediblePrices = dispProds.filter(p=>p.cat==="edible").map(p=>p.finalP);
                      const vapePrices   = dispProds.filter(p=>p.cat==="vape").map(p=>p.finalP);
                      return (
                        <div key={d.id} className={`disp-full-card${d.id===6?" perpetual":""}`}>
                          <div className="dfc-header">
                            <div>
                              <div className="dfc-name">{d.name}</div>
                              <div className="dfc-type">{d.type}</div>
                            </div>
                            <div className="dfc-badges">
                              <span className={d.open?"badge-open":"badge-closed"}>{d.open?"\u25CF Open":"\u25CF Closed"}</span>
                              <span className={d.type==="Rec+Med"?"badge-recmed":"badge-rec"}>{d.type}</span>
                              {d.id===6 && <span className="badge-no-tax">Tax In Menu</span>}
                            </div>
                          </div>
                          <div className="dfc-body">
                            {detail.address && (
                              <div className="dfc-row">
                                <span className="dfc-row-icon">{"\u{1F4CD}"}</span>
                                <span>{detail.address}</span>
                              </div>
                            )}
                            {detail.phone && (
                              <div className="dfc-row">
                                <span className="dfc-row-icon">{"\u{1F4DE}"}</span>
                                <a href={`tel:${detail.phone}`} style={{color:"var(--forest)",textDecoration:"none",fontWeight:500}}>{detail.phone}</a>
                              </div>
                            )}
                            {detail.about && (
                              <div className="dfc-row" style={{marginBottom:"0.75rem"}}>
                                <span className="dfc-row-icon">{"\u2139\uFE0F"}</span>
                                <span style={{color:"var(--moss)",fontSize:"0.77rem",lineHeight:1.5}}>{detail.about}</span>
                              </div>
                            )}
                            {Object.keys(hrs).length > 0 && (
                              <div style={{marginBottom:"0.75rem"}}>
                                <div style={{fontSize:"0.7rem",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",color:"var(--moss)",marginBottom:"0.4rem"}}>Hours</div>
                                <div className="dfc-hours-grid">
                                  {Object.entries(hrs).map(([day,time])=>(
                                    <div key={day} className={`dfc-day${day===today?" today":""}`}>
                                      <span className="dfc-day-name">{day}</span>
                                      <span className="dfc-day-hours">{time}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            {dispProds.length > 0 && (
                              <div>
                                <div style={{fontSize:"0.7rem",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",color:"var(--moss)",marginBottom:"0.4rem"}}>Live Prices (w/ tax)</div>
                                <div className="dfc-price-strip">
                                  {flowerPrices.length>0 && <div className="dfc-price-item"><div className="dfc-price-cat">{"\u{1F33F}"} Flower</div><div className="dfc-price-val">From ${Math.min(...flowerPrices)}</div></div>}
                                  {vapePrices.length>0   && <div className="dfc-price-item"><div className="dfc-price-cat">{"\u{1F4A8}"} Vapes</div><div className="dfc-price-val">From ${Math.min(...vapePrices)}</div></div>}
                                  {ediblePrices.length>0 && <div className="dfc-price-item"><div className="dfc-price-cat">{"\u{1F36C}"} Edibles</div><div className="dfc-price-val">From ${Math.min(...ediblePrices)}</div></div>}
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="dfc-footer">
                            <div className="dfc-amenities">
                              {(detail.amenities||[]).map(a=><span key={a} className="amenity-tag">{a}</span>)}
                            </div>
                            <a className="dfc-site-link" href={d.website} target="_blank" rel="noopener noreferrer">Visit site {"\u2192"}</a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })()}
      <footer>
        <strong>{"\u{1F33F}"} The Berkshire Buds</strong>
        All prices are final out-the-door totals including 20% MA recreational cannabis tax.<br/>
        Exception: Perpetual Dispensary menu prices already include tax.<br/>
        For adults 21+ only {"\u00B7"} Always verify current prices with the dispensary.<br/>
        <a href="#">Add a Dispensary</a> {"\u00B7"} <a href="#">Report a Price Error</a> {"\u00B7"} <a href="#">About</a>
      </footer>
    </div>
  );
}
