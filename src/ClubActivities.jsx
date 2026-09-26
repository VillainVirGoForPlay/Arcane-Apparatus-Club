import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Paper, Zoom } from "@mui/material";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import CasinoIcon from "@mui/icons-material/Casino";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Fade } from "@mui/material";
// ==========================================
// ฟังก์ชันสร้างภาพจำลองแบบ "พื้นใส" (มีอีโมจิ สำหรับไอเทมปริศนา)
// ==========================================
const createTransparentMock = (emoji, glowColor = "#D4AF37") => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="${glowColor}" stop-opacity="0.7" />
          <stop offset="60%" stop-color="${glowColor}" stop-opacity="0.2" />
          <stop offset="100%" stop-color="${glowColor}" stop-opacity="0" />
        </radialGradient>
        <filter id="drop-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="5" stdDeviation="5" flood-color="#000" flood-opacity="0.8"/>
        </filter>
      </defs>
      <circle cx="100" cy="100" r="90" fill="url(#glow)" />
      <text x="50%" y="55%" font-size="95" text-anchor="middle" dominant-baseline="middle" filter="url(#drop-shadow)">${emoji}</text>
    </svg>
  `;
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
};

// ==========================================
// ฟังก์ชันสร้างภาพจำลองสำหรับ "สี" (แสดงแค่ออร่าสี ไม่ใช้อีโมจิสี่เหลี่ยม)
// ==========================================
const createColorMock = (glowColor) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="${glowColor}" stop-opacity="0.9" />
          <stop offset="50%" stop-color="${glowColor}" stop-opacity="0.4" />
          <stop offset="100%" stop-color="${glowColor}" stop-opacity="0" />
        </radialGradient>
        <filter id="drop-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000" flood-opacity="0.3"/>
        </filter>
      </defs>
      <circle cx="100" cy="100" r="90" fill="url(#glow)" />
      <circle cx="100" cy="100" r="40" fill="${glowColor}" filter="url(#drop-shadow)" />
    </svg>
  `;
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
};

// ==========================================
// ข้อมูลสำหรับสุ่มกิจกรรมแรก
// ==========================================
const MYSTERY_ARTIFACTS = [
  {
    name: "กระจกหน้าเปื้อน",
    desc: "กระจกที่เมื่อส่องดูจะเห็นรอยเปื้อนคราบเขม่าดำๆ ติดที่แก้มอยู่ตลอด\nคุณสามารถถูๆ คราบนั้นให้หายไปได้ แต่มันจะกลับมาในตำแหน่งใหม่เมื่อใช้งานกระจกอีกครั้ง",
    creator: "เฟิ่งเฉิน ฟ็อกซ์",
    img: "7.png",
  },
  {
    name: "ปากกาขนนกจดอัตโนมัติ",
    desc: "ปากกาขนนกนี้จดทุกสิ่งที่มันได้ยิน ตั้งแต่คำพูด เสียงจาม หรือแม้แต่เสียงของตก\nและไม่รู้จักการเว้นระหว่างคำ ข้อความที่คุณได้จะติดกันเป็นพรืด\nจนกว่าเสียงรอบข้างมันจะเงียบลง มันถึงจะเริ่มประโยคใหม่",
    creator: "เบนจามิน รอสส์",
    img: "6.png",
  },
  {
    name: "เปือกก้วย",
    desc: "คุณเจอมันซะแล้ว… ขยะย่อยสลายง่ายโดยสมาชิกลึกลับ\nงั้นฝากเอาไปทิ้งทีนะ !",
    creator: "สมาชิกลึกลับ",
    img: createTransparentMock("🍌", "#D4AF37"),
  },
  {
    name: "หวีย้อมผม",
    desc: "ผมในบริเวณที่ถูกหวีจะเปลี่ยนสีไปเรื่อยๆ\nและจะจางหายไปเองภายในเวลา 1 นาที",
    creator: "เฟิ่งเฉิน ฟ็อกซ์",
    img: "8.png",
  },
  {
    name: "โคมไฟปรับอุณหภูมิ",
    desc: "เมื่อลูบเบาๆ ที่ส่วนหัวจะทำงานโดยแผ่อุณหภูมิในรัศมี 1 เมตร (ได้ทั้งร้อนทั้งเย็น)\nและเรืองแสงสีนวลตาที่สว่างพอดีสำหรับการอ่านหนังสือ",
    creator: "เนียโร แลงคาสเตอร์",
    img: createTransparentMock("🏮", "#D4AF37"),
  },
  {
    name: "ทรัมเป็ตที่ไม่ใช่ทรัมเป็ต",
    desc: "เป็นทรัมเป็ตของเล่นชิ้นเล็ก ๆ เมื่อเป่าเข้าไป\nเสียงที่ออกมากลับไม่ใช่เสียงของทรัมเป็ตเลยแม้แต่นิดเดียว\nมันอาจจะเป็นเสียงฮาร์ป หรือเสียงหมูหมากาไก่\nมันเป็นเสียงอะไรก็ได้ที่ไม่ใช่ทรัมเป็ตเลยล่ะ…",
    creator: "กาเรธ อีแวนส์",
    img: createTransparentMock("🎺", "#D4AF37"),
  },
  {
    name: "ก้อนกระดาษ",
    desc: "มันคือก้อนกระดาษที่ถูกโยนทิ้งอย่างน่าสงสาร\nคุณจะลองเอาสิ่งประดิษฐ์บนกระดาษยับยู่ยี่นี่ไปต่อยอดก็ได้\nแต่เจ้าของเดิมของมันได้ยอมแพ้แล้วล่ะ",
    creator: "เบนจามิน รอสส์",
    img: "5.png",
  },
  {
    name: "รองเท้ายกลอย (ข้างเดียว)",
    desc: "เมื่อสวมใส่ คุณจะสามารถลอยขึ้นจากพื้นได้ประมาณห้าถึงหกนิ้ว\nมันยังคงต้องปรับแก้อีกมากและมีความเสี่ยงสูงหากจะสวมใส่\nโดยเฉพาะอย่างยิ่ง ตอนที่เหลือแค่ข้างเดียวแบบนี้\nดังนั้นถ้าคุณได้รับมัน กรุณาอย่าใส่และเอาไปคืนชมรมโดยด่วน!",
    creator: "เบนจามิน รอสส์",
    img: "9.png",
  },
  {
    name: "ถุงเท้าเล่าความจริง",
    desc: "มันเป็นถุงเท้าที่มักจะอยู่เป็นคู่กันเสมอ\nเมื่อสวมใส่แล้วเดินทุกก้าวที่เหยียบลงพื้น\nมันจะตะโกนร้องเรื่องหน้าอายของผู้ใส่ออกมา",
    creator: "วิลโลว์ เบลรีฟ",
    img: "4.png",
  },
  {
    name: "ยางมัดผมหรรษา",
    desc: "ยางมัดผมสุดน่ารักที่ใส่รสนิยมฉบับที่มักมักเกิ้ลชอบลงไปด้วย\nมันไม่ได้เป็นอุปกรณ์วิเศษอะไร\nเหมือนคนทำจะทำแก้ว่างเฉย ๆ เท่านั้น",
    creator: "วิลโลว์ เบลรีฟ",
    img: "3.png",
  },
  {
    name: "ของสมนาคุณจำกัด 20 เซ็ต",
    desc: "รูปปั้นเสมือนจริงของรองประธานชมรม(คนปัจจุบัน)ไม่มีประโยชน์อะไร\nได้ไปทำไมไม่ทราบ จะเพื่อบูชาประคองจิตใจสุดแล้วแต่สะดวกต้องการ",
    creator: "วิลโลว์ เบลรีฟ",
    img: "2.png",
  },
  {
    name: "สมุดเก่าที่ดูมีพิรุธ",
    desc: "เป็นสมุดที่สภาพค่อนข้างไปทางเน่า\nเมื่อเปิดออกมาก็พบว่าเนื้อความด้านในคือความลับของสมาชิกในชมรม\nและถ้ากำลังจะกวาดตาอ่านบรรทัดต่อไป\nสมาชิกสักคนในชมรมจะรีบวิ่งมาชาร์จแย่งมันออกไปจากมือคุณทันที",
    creator: "วิลโลว์ เบลรีฟ",
    img: "1.png",
  },
];

// ==========================================
// ข้อมูลสำหรับตู้สล็อต
// ==========================================
const SLOT_DATA = {
  base: [
    { label: "กระจก", img: "กระจก.png" },
    { label: "กล่องมีฝาขนาดเล็ก", img: "กล่องมีฝาขนาดเล็ก.png" },
    { label: "แก้วชา", img: "แก้วชา.png" },
    { label: "ขวดหมึก", img: "ขวดหมึก.png" },
    { label: "จาน", img: "จาน.png" },
    { label: "ช้อน", img: "ช้อน.png" },
    { label: "ส้อม", img: "ส้อม.png" },
  ],
  color: [
    { label: "สีแดง", img: createColorMock("#9B111E") },
    { label: "สีส้ม", img: createColorMock("#FF8C00") },
    { label: "สีเหลือง", img: createColorMock("#D4AF37") },
    { label: "สีเขียว", img: createColorMock("#2E8B57") },
    { label: "สีน้ำเงิน", img: createColorMock("#0F52BA") },
    { label: "สีม่วง", img: createColorMock("#8A2BE2") },
    { label: "สีน้ำตาล", img: createColorMock("#B87333") },
    { label: "สีดำ", img: createColorMock("#333333") },
    { label: "สีขาว", img: createColorMock("#F0F0F0") }, // ใช้สีเทาอ่อนเพื่อให้เห็นออร่าบนพื้นขาว
  ],
  addon: [
    { label: "ขา", img: "ขา.png" },
    { label: "แขน", img: "แขน.png" },
    { label: "งวง", img: "งวง.png" },
    { label: "ปีก", img: "ปีก.png" },
    { label: "หมวก", img: "หมวก.png" },
    { label: "หาง", img: "หาง.png" },
  ],
};

// ==========================================
// 1. คอมโพเนนต์ สุ่มสิ่งประดิษฐ์จากกอง (ระบบอัญเชิญ)
// ==========================================
export const RandomArtifactPicker = () => {
  useEffect(() => {
    const artifactImages = MYSTERY_ARTIFACTS.map((item) => item.img);
    artifactImages.forEach((src) => {
      if (src && String(src).startsWith("/")) {
        const img = new Image();
        img.src = src;
      }
    });
  }, []);

  const [result, setResult] = useState(null);
  const [isPicking, setIsPicking] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);

  const handlePick = () => {
    if (isPicking) return;
    setIsPicking(true);
    setResult(null);

    // แสงแฟลช 0.5 วินาทีสุดท้าย
    setTimeout(() => {
      setIsFlashing(true);
    }, 2000);

    // เผยไอเทม
    setTimeout(() => {
      const finalResult =
        MYSTERY_ARTIFACTS[Math.floor(Math.random() * MYSTERY_ARTIFACTS.length)];
      setResult(finalResult);
      setIsPicking(false);

      setTimeout(() => {
        setIsFlashing(false);
      }, 300);
    }, 2500);
  };

  return (
    <Paper
      elevation={8}
      sx={{
        bgcolor: "rgba(17, 20, 25, 0.7)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(212, 175, 55, 0.15)",
        borderRadius: "8px",
        p: { xs: 3, sm: 5, md: 6 },
        mb: 8,
        position: "relative",
        overflow: "hidden",
        boxShadow:
          "0 8px 32px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(212, 175, 55, 0.1)",
        "@keyframes spinRight": {
          "0%": { transform: "translate(-50%, -50%) rotate(0deg)" },
          "100%": { transform: "translate(-50%, -50%) rotate(360deg)" },
        },
        "@keyframes spinLeft": {
          "0%": { transform: "translate(-50%, -50%) rotate(0deg)" },
          "100%": { transform: "translate(-50%, -50%) rotate(-360deg)" },
        },
        "@keyframes pulseAura": {
          "0%, 100%": {
            transform: "translate(-50%, -50%) scale(1)",
            opacity: 0.4,
          },
          "50%": {
            transform: "translate(-50%, -50%) scale(1.1)",
            opacity: 0.8,
          },
        },
        "@keyframes shockwave": {
          "0%": {
            transform: "translate(-50%, -50%) scale(0)",
            opacity: 1,
            border: "2px solid #D4AF37",
          },
          "100%": {
            transform: "translate(-50%, -50%) scale(4)",
            opacity: 0,
            border: "15px solid #FFFDE4",
          },
        },
        "@keyframes floatItem": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
        "@keyframes floatParticle": {
          "0%": { transform: "translateY(0) scale(1)", opacity: 0 },
          "50%": { opacity: 1 },
          "100%": { transform: "translateY(-100px) scale(0)", opacity: 0 },
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background:
            "linear-gradient(90deg, transparent, #D4AF37, transparent)",
          opacity: 0.8,
        }}
      />

      <Typography
        variant="h4"
        sx={{
          color: "primary.main",
          mb: 2,
          fontFamily: "'Henny Penny', cursive",
          textAlign: "center",
          textShadow: "0 2px 4px rgba(0,0,0,0.5)",
        }}
      >
        สุ่มสิ่งประดิษฐ์จากชมรมวิจัยอุปกรณ์เวทมนตร์
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "text.secondary",
          mb: 6,
          fontFamily: "'Sarabun', sans-serif",
          maxWidth: "800px",
          mx: "auto",
          textAlign: "center",
          lineHeight: 1.8,
        }}
      >
        สุ่มหยิบสิ่งของสักหนึ่งชิ้น จากกองสิ่งประดิษฐ์ที่อยู่ภายในห้อง
        จากนั้นมาดูกันว่า... สิ่งที่หยิบขึ้นมาได้นั้นคืออะไรกันแน่?
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 5,
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            minHeight: { xs: "550px", sm: "650px" }, // เพิ่ม minHeight เผื่อไว้ให้กล่องคงที่เสมอ
            py: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "radial-gradient(circle, #151A22 0%, #05060A 100%)",
            borderRadius: "16px",
            border: "1px dashed rgba(212, 175, 55, 0.3)",
            boxShadow: "inset 0 0 80px rgba(0,0,0,0.9)",
            overflow: "hidden",
          }}
        >
          {/* แสงแฟลชสีทองวาบ */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "radial-gradient(circle, #FFFDE4 0%, #D4AF37 50%, transparent 100%)",
              opacity: isFlashing ? 1 : 0,
              transition: isFlashing ? "opacity 0.2s" : "opacity 0.8s ease-out",
              zIndex: 50,
              pointerEvents: "none",
            }}
          />

          {/* ✨ Particles Effect ✨ */}
          {(isPicking || result) &&
            [...Array(15)].map((_, i) => (
              <Box
                key={i}
                sx={{
                  position: "absolute",
                  width: `${Math.random() * 6 + 2}px`,
                  height: `${Math.random() * 6 + 2}px`,
                  backgroundColor: i % 2 === 0 ? "#D4AF37" : "#FFFDE4",
                  borderRadius: "50%",
                  left: `${Math.random() * 80 + 10}%`,
                  top: `${Math.random() * 80 + 10}%`,
                  boxShadow: "0 0 10px #D4AF37",
                  animation: `floatParticle ${Math.random() * 2 + 1}s ease-in infinite`,
                  animationDelay: `${Math.random() * 2}s`,
                  zIndex: 3,
                  pointerEvents: "none",
                }}
              />
            ))}

          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1,
              pointerEvents: "none",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: { xs: "260px", sm: "360px" },
                height: { xs: "260px", sm: "360px" },
                border: "2px dashed rgba(212, 175, 55, 0.3)",
                borderRadius: "50%",
                animation: isPicking
                  ? "spinRight 1.5s linear infinite"
                  : "spinRight 20s linear infinite",
                transition: "all 0.5s",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: { xs: "200px", sm: "280px" },
                height: { xs: "200px", sm: "280px" },
                border: "1px solid rgba(212,175,55,0.2)",
                borderTop: "3px solid #D4AF37",
                borderBottom: "3px solid #D4AF37",
                borderRadius: "50%",
                animation: isPicking
                  ? "spinLeft 1s linear infinite"
                  : "spinLeft 15s linear infinite",
                transition: "all 0.5s",
                boxShadow: "0 0 20px rgba(212,175,55,0.1)",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: { xs: "140px", sm: "200px" },
                height: { xs: "140px", sm: "200px" },
                border: "1px dotted rgba(212,175,55,0.5)",
                borderRadius: "50%",
                animation: isPicking
                  ? "spinRight 2s linear infinite"
                  : "spinRight 10s linear infinite",
                transition: "all 0.5s",
              }}
            />

            {isPicking && (
              <>
                {[0, 0.5, 1].map((delay, index) => (
                  <Box
                    key={index}
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: { xs: "60px", sm: "80px" },
                      height: { xs: "60px", sm: "80px" },
                      borderRadius: "50%",
                      animation: `shockwave 1.5s ease-out infinite`,
                      animationDelay: `${delay}s`,
                    }}
                  />
                ))}
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: { xs: "50px", sm: "70px" },
                    height: { xs: "50px", sm: "70px" },
                    borderRadius: "50%",
                    bgcolor: "#FFFDE4",
                    boxShadow:
                      "0 0 60px 20px #D4AF37, 0 0 120px 50px rgba(212,175,55,0.4)",
                    animation: "pulseAura 0.5s infinite",
                  }}
                />
              </>
            )}
          </Box>

          {!isPicking && !result && (
            <Brightness7Icon
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: { xs: 70, sm: 100 },
                color: "rgba(212, 175, 55, 0.4)",
                animation: "pulseAura 3s infinite",
                filter: "drop-shadow(0 0 15px rgba(212,175,55,0.8))",
                zIndex: 5,
              }}
            />
          )}

          {!isPicking && result && (
            <Fade in={!isPicking} timeout={800}>
              <Box
                sx={{
                  textAlign: "center",
                  position: "relative",
                  zIndex: 10,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Box
                  component="img"
                  src={result.img}
                  alt={result.name}
                  sx={{
                    width: { xs: "220px", sm: "380px" }, // ฟิกความกว้างคงที่
                    height: { xs: "220px", sm: "380px" }, // ฟิกความสูงคงที่
                    objectFit: "contain",
                    mb: { xs: -2, sm: -4 },
                    zIndex: 2,
                    animation: "floatItem 4s ease-in-out infinite",
                    filter: "drop-shadow(0px 20px 25px rgba(0,0,0,0.9))",
                  }}
                />

                <Paper
                  sx={{
                    px: { xs: 2, sm: 4 },
                    py: { xs: 2.5, sm: 3 },
                    bgcolor: "rgba(17, 20, 25, 0.85)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(212, 175, 55, 0.3)",
                    borderTop: "2px solid rgba(212, 175, 55, 0.8)",
                    borderRadius: "16px",
                    boxShadow:
                      "0 20px 40px rgba(0,0,0,0.9), inset 0 0 20px rgba(212,175,55,0.1), 0 -10px 20px rgba(0,0,0,0.5)",
                    maxWidth: "850px",
                    width: "95%",
                    minHeight: { xs: "180px", sm: "200px" }, // ฟิกความสูงขั้นต่ำของกล่องข้อความ
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center", // จัดให้อยู่ตรงกลางเสมอ
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: "primary.main",
                      fontFamily: "'Sarabun', serif",
                      fontWeight: 800,
                      mb: 1.5,
                      textShadow: "0 2px 4px rgba(0,0,0,0.8)",
                      textAlign: "center",
                    }}
                  >
                    {result.name}
                  </Typography>

                  <Box
                    sx={{
                      width: "50%",
                      height: "1px",
                      background:
                        "radial-gradient(circle, rgba(212,175,55,0.8) 0%, transparent 100%)",
                      mb: 1.5,
                    }}
                  />

                  <Typography
                    variant="body2"
                    sx={{
                      color: "#EAE0D5",
                      fontFamily: "'Sarabun', sans-serif",
                      fontWeight: 300,
                      fontSize: { xs: "0.85rem", sm: "0.95rem" },
                      mb: 3,
                      textAlign: "center",
                      lineHeight: 1.6,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {result.desc}
                  </Typography>

                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 1,
                      bgcolor: "rgba(212, 175, 55, 0.1)",
                      px: 2,
                      py: 0.5,
                      borderRadius: "50px",
                      border: "1px solid rgba(212, 175, 55, 0.3)",
                      mt: "auto",
                    }}
                  >
                    <AccountCircleIcon
                      sx={{ color: "primary.main", fontSize: 18 }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        color: "primary.main",
                        fontFamily: "'Sarabun', sans-serif",
                        fontWeight: 600,
                        letterSpacing: 0.5,
                        fontSize: "0.75rem",
                      }}
                    >
                      ผู้ประดิษฐ์: {result.creator}
                    </Typography>
                  </Box>
                </Paper>
              </Box>
            </Fade>
          )}
        </Box>

        <Button
          onClick={handlePick}
          disabled={isPicking || isFlashing}
          startIcon={<AutoFixHighIcon sx={{ fontSize: 24 }} />}
          sx={{
            background: "transparent",
            color: "#D4AF37",
            border: "1px solid rgba(212, 175, 55, 0.5)",
            borderRadius: "50px",
            px: { xs: 4, md: 6 },
            py: { xs: 1.5, md: 2 },
            fontSize: { xs: "1rem", md: "1.2rem" },
            fontFamily: "'Sarabun', sans-serif",
            fontWeight: 600,
            boxShadow:
              "0 4px 15px rgba(212, 175, 55, 0.15), inset 0 0 20px rgba(212,175,55,0.1)",
            transition: "all 0.3s ease",
            "&:hover": {
              background: "rgba(212, 175, 55, 0.15)",
              boxShadow:
                "0 6px 20px rgba(212, 175, 55, 0.3), inset 0 0 25px rgba(212,175,55,0.2)",
              transform: "translateY(-3px) scale(1.02)",
              borderColor: "#D4AF37",
            },
            "&:active": { transform: "translateY(2px)" },
            "&:disabled": {
              color: "rgba(212, 175, 55, 0.3)",
              borderColor: "rgba(212, 175, 55, 0.2)",
              boxShadow: "none",
            },
          }}
        >
          {isPicking
            ? "สิ่งที่อยู่ในกองคือ..."
            : result
              ? "กรุยต่อไป"
              : "กดเพื่อกรุยมือ"}
        </Button>
      </Box>
    </Paper>
  );
};
export const ArtifactSlotMachine = () => {
  useEffect(() => {
    const slotImages = [
      ...SLOT_DATA.base.map((item) => item.img),
      ...SLOT_DATA.color.map((item) => item.img),
      ...SLOT_DATA.addon.map((item) => item.img),
    ];
    slotImages.forEach((src) => {
      if (src && String(src).startsWith("/")) {
        const img = new Image();
        img.src = src;
      }
    });
  }, []);

  const defaultSlot = { label: "?", img: createTransparentMock("❓", "#555") };
  const [slots, setSlots] = useState({
    base: defaultSlot,
    color: defaultSlot,
    addon: defaultSlot,
  });
  const [isSpinning, setIsSpinning] = useState(false);
  const [activeSlot, setActiveSlot] = useState(null);

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setActiveSlot("all");

    let baseInterval = setInterval(
      () =>
        setSlots((p) => ({
          ...p,
          base: SLOT_DATA.base[
            Math.floor(Math.random() * SLOT_DATA.base.length)
          ],
        })),
      80,
    );
    let colorInterval = setInterval(
      () =>
        setSlots((p) => ({
          ...p,
          color:
            SLOT_DATA.color[Math.floor(Math.random() * SLOT_DATA.color.length)],
        })),
      80,
    );
    let addonInterval = setInterval(
      () =>
        setSlots((p) => ({
          ...p,
          addon:
            SLOT_DATA.addon[Math.floor(Math.random() * SLOT_DATA.addon.length)],
        })),
      80,
    );

    setTimeout(() => {
      clearInterval(baseInterval);
      setSlots((p) => ({
        ...p,
        base: SLOT_DATA.base[Math.floor(Math.random() * SLOT_DATA.base.length)],
      }));
      setActiveSlot("color-addon");
    }, 1200);
    setTimeout(() => {
      clearInterval(colorInterval);
      setSlots((p) => ({
        ...p,
        color:
          SLOT_DATA.color[Math.floor(Math.random() * SLOT_DATA.color.length)],
      }));
      setActiveSlot("addon");
    }, 2200);
    setTimeout(() => {
      clearInterval(addonInterval);
      setSlots((p) => ({
        ...p,
        addon:
          SLOT_DATA.addon[Math.floor(Math.random() * SLOT_DATA.addon.length)],
      }));
      setActiveSlot(null);
      setIsSpinning(false);
    }, 3200);
  };

  const SlotBox = ({ title, item, isSpinningSlot }) => (
    <Box
      sx={{
        width: "100%",
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Typography
        variant="overline"
        sx={{
          color: "primary.main",
          fontWeight: 800,
          fontSize: { xs: "0.9rem", sm: "1.1rem" },
          letterSpacing: 2,
          textShadow: "0 2px 4px #000",
          textAlign: "center",
          width: "100%",
        }}
      >
        {title}
      </Typography>
      <Paper
        sx={{
          width: "100%",
          height: { xs: "200px", sm: "260px", md: "280px" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#fffdf8",
          border: isSpinningSlot
            ? "2px solid #D4AF37"
            : "2px solid rgba(212, 175, 55, 0.4)",
          boxShadow: isSpinningSlot
            ? "inset 0 0 20px rgba(212, 175, 55, 0.3), 0 0 15px rgba(212,175,55,0.4)"
            : "inset 0 4px 15px rgba(0,0,0,0.1)",
          borderRadius: "12px",
          overflow: "hidden",
          p: 1.5,
          position: "relative",
        }}
      >
        <Box
          sx={{
            width: { xs: "110px", sm: "150px" },
            height: { xs: "110px", sm: "150px" },
            mb: 2,
            zIndex: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // ลดแสงเรืองรองด้านหลังลงเพื่อให้กลืนกับพื้นสีขาว
            background:
              "radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 60%)",
            borderRadius: "50%",
            transition: "all 0.1s",
            transform: isSpinningSlot
              ? "scale(1.1) translateY(8px)"
              : "scale(1) translateY(0)",
          }}
        >
          <Box
            component="img"
            src={item.img}
            sx={{
              width: { xs: "90px", sm: "140px" },
              height: { xs: "90px", sm: "140px" },
              objectFit: "contain",
              filter: isSpinningSlot
                ? "blur(2px)"
                : "drop-shadow(0px 2px 3px rgba(0,0,0,0.3))",
            }}
          />
        </Box>
        <Paper
          elevation={0}
          sx={{
            width: "95%",
            bgcolor: "rgba(17, 20, 25, 0.9)", // ✅ คงพื้นหลังสีเข้มไว้ที่ป้ายกำกับด้านล่างเพื่อให้ตัวหนังสืออ่านง่าย
            px: 2,
            py: 1,
            borderRadius: "20px",
            zIndex: 2,
            border: "1px solid rgba(212,175,55,0.3)",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: item.label === "?" ? "rgba(212, 175, 55, 0.5)" : "#FFFDE4",
              fontFamily: "'Sarabun', sans-serif",
              fontWeight: 600,
              textAlign: "center",
              fontSize: { xs: "0.85rem", sm: "1rem" },
              filter: isSpinningSlot ? "blur(1px)" : "blur(0px)",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              lineHeight: 1.3,
            }}
          >
            {item.label}
          </Typography>
        </Paper>
      </Paper>
    </Box>
  );

  return (
    <Paper
      elevation={8}
      sx={{
        bgcolor: "rgba(17, 20, 25, 0.7)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(212, 175, 55, 0.15)",
        borderRadius: "8px",
        p: { xs: 3, sm: 5, md: 6 },
        mb: 4,
        position: "relative",
        overflow: "visible",
        boxShadow:
          "0 8px 32px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(212, 175, 55, 0.1)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background:
            "linear-gradient(90deg, transparent, #D4AF37, transparent)",
          opacity: 0.8,
        }}
      />

      <Typography
        variant="h4"
        sx={{
          color: "primary.main",
          mb: 2,
          fontFamily: "'Henny Penny', cursive",
          textAlign: "center",
          textShadow: "0 2px 4px rgba(0,0,0,0.5)",
        }}
      >
        สุ่มสร้างสิ่งประดิษฐ์
      </Typography>

      {/* ส่วนอธิบายด้านบน */}
      <Typography
        variant="body1"
        sx={{
          color: "text.secondary",
          mb: 3,
          fontFamily: "'Sarabun', sans-serif",
          maxWidth: "800px",
          textAlign: "center",
          mx: "auto",
          lineHeight: 1.8,
        }}
      >
        <Box component="span" sx={{ color: "primary.main", fontWeight: 600 }}>
          วัตถุตั้งต้น → สี → ส่วนเสริม
        </Box>{" "}
        <br />
        นำสิ่งที่สุ่มได้ทั้งหมดมาประกอบกันเป็นสิ่งประดิษฐ์หนึ่งชิ้น
        <br />
        <Box
          component="span"
          sx={{
            color: "#FFFDE4",
            fontStyle: "italic",
            mt: 1,
            display: "inline-block",
          }}
        >
          "ลองจินตนาการต่อดูว่า สิ่งประดิษฐ์ชิ้นนี้มีหน้าตาเป็นอย่างไร
          ใช้งานอย่างไร และมันมีพฤติกรรมประหลาดอะไรบ้าง?"
        </Box>
      </Typography>

      {/* กล่องข้อควรรู้ / กฎของสิ่งประดิษฐ์ */}
      <Paper
        elevation={0}
        sx={{
          maxWidth: "800px",
          mx: "auto",
          mb: 6,
          p: { xs: 2.5, md: 3 },
          bgcolor: "rgba(212, 175, 55, 0.08)",
          border: "1px dashed rgba(212, 175, 55, 0.4)",
          borderRadius: "12px",
          backdropFilter: "blur(4px)",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            color: "primary.main",
            fontWeight: 700,
            mb: 1.5,
            fontFamily: "'Sarabun', sans-serif",
            textAlign: "center",
          }}
        >
          ✨ พฤติกรรมของสิ่งประดิษฐ์ ✨
        </Typography>
        <Box
          component="ul"
          sx={{
            color: "#EAE0D5",
            fontFamily: "'Sarabun', sans-serif",
            lineHeight: 1.7,
            fontSize: { xs: "0.85rem", md: "0.95rem" },
            pl: 3,
            m: 0,
            "& li": { mb: 1 },
          }}
        >
          <li>
            สิ่งประดิษฐ์จะไม่สามารถขยับได้จนกว่าจะโดน <b>ไม้กายสิทธิ์แตะ</b>{" "}
            และหลังจากโดนจิ้มอีกรอบ
            มันจะกลับไปแข็งทื่อและนำไปเป็นของประดับบ้านได้
          </li>
          <li>
            พวกมัน <b>ไม่มีความคิดชั่วร้าย</b>{" "}
            จุดมุ่งหมายสูงสุดคือทำหน้าที่ของวัตถุตั้งต้นให้ดีที่สุด เช่น
            ช้อนจะตักอาหารให้คุณหากมันมีขา หรือขวดหมึกจะเปิด-ปิดฝาให้ถ้ามันมีแขน{" "}
            <i>(แต่ถ้าสุ่มได้งวง... ก็ไปลุ้นเอาเองล่ะว่ามันจะทำอะไรได้!)</i>
          </li>
          <li>
            การจะอำนวยความสะดวกให้ผู้สร้าง มันต้อง{" "}
            <b>อยู่ใกล้สิ่งที่เป็นงานของมัน</b> ด้วย เช่น ช้อนอยู่ใกล้อาหาร
            กล่องอยู่ใกล้เครื่องประดับ กระจกอยู่ใกล้เจ้าของ
          </li>
        </Box>
      </Paper>

      <Box
        sx={{
          position: "relative",
          background: "linear-gradient(145deg, #151A22 0%, #05060A 100%)",
          border: "4px solid rgba(212, 175, 55, 0.6)",
          borderRadius: "20px",
          p: { xs: 3, sm: 5 },
          mb: 6,
          boxShadow:
            "0 30px 60px rgba(0,0,0,0.8), inset 0 0 30px rgba(0,0,0,0.9)",
          mr: { xs: 0, md: 8 },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            right: { xs: 10, md: -90 },
            top: "50%",
            transform: "translateY(-50%)",
            width: "70px",
            height: "240px",
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 90,
              borderRadius: "8px",
              position: "absolute",
              bottom: 10,
              background:
                "linear-gradient(90deg, #111 0%, #333 50%, #000 100%)",
              border: "2px solid rgba(212, 175, 55, 0.6)",
              boxShadow: "inset 0 0 15px rgba(0,0,0,0.9)",
            }}
          />
          <Box
            sx={{
              width: 18,
              height: 160,
              background:
                "linear-gradient(90deg, #a8a8a8 0%, #ffffff 50%, #8c8c8c 100%)",
              position: "absolute",
              bottom: 50,
              transformOrigin: "bottom center",
              transform: isSpinning ? "rotateX(75deg)" : "rotateX(10deg)",
              transition:
                "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              borderLeft: "2px solid #fff",
              borderRight: "2px solid #555",
            }}
          >
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle at 35% 35%, #e02f2f, #9B111E 60%, #4a040b)",
                position: "absolute",
                top: -30,
                left: -20,
                boxShadow:
                  "0 15px 30px rgba(0,0,0,0.8), inset -5px -5px 15px rgba(0,0,0,0.5)",
                border: "1px solid #ff9999",
              }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
            gap: { xs: 3, md: 4 },
            width: "100%",
          }}
        >
          <SlotBox
            title="วัตถุตั้งต้น"
            item={slots.base}
            isSpinningSlot={activeSlot === "all"}
          />
          <SlotBox
            title="สี"
            item={slots.color}
            isSpinningSlot={
              activeSlot === "all" || activeSlot === "color-addon"
            }
          />
          <SlotBox
            title="ส่วนเสริม"
            item={slots.addon}
            isSpinningSlot={activeSlot !== null}
          />
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          onClick={handleSpin}
          disabled={isSpinning}
          startIcon={<CasinoIcon sx={{ fontSize: 32 }} />}
          sx={{
            background: "linear-gradient(180deg, #9B111E 0%, #440E0E 100%)",
            color: "#FFFDE4",
            border: "2px solid rgba(212, 175, 55, 0.8)",
            borderRadius: "40px",
            px: { xs: 6, md: 8 },
            py: 2,
            fontSize: { xs: "1.2rem", md: "1.4rem" },
            fontFamily: "'Sarabun', sans-serif",
            fontWeight: 700,
            letterSpacing: 1,
            boxShadow:
              "0 10px 30px rgba(155, 17, 30, 0.6), inset 0 2px 8px rgba(255,255,255,0.3)",
            transition: "all 0.2s",
            "&:hover": {
              background: "linear-gradient(180deg, #b81424 0%, #5c1313 100%)",
              transform: "translateY(-4px) scale(1.02)",
              boxShadow:
                "0 15px 40px rgba(155, 17, 30, 0.8), 0 0 25px rgba(212,175,55,0.6)",
            },
            "&:active": {
              transform: "translateY(2px)",
              boxShadow: "0 4px 10px rgba(155, 17, 30, 0.6)",
            },
            "&:disabled": {
              background: "#1a0505",
              color: "rgba(255, 255, 255, 0.3)",
              borderColor: "rgba(212, 175, 55, 0.2)",
              boxShadow: "none",
            },
          }}
        >
          {isSpinning ? "วิ้งงง!" : "ดึงคันโยก!"}
        </Button>
      </Box>
    </Paper>
  );
};
