import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Grid,
  ThemeProvider,
  createTheme,
  CssBaseline,
  GlobalStyles,
  Paper,
  Fade,
  Link,
} from "@mui/material";

// --- Icons ---
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import BuildIcon from "@mui/icons-material/Build";
import ChatIcon from "@mui/icons-material/Chat";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import ArticleIcon from "@mui/icons-material/Article";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CastleIcon from "@mui/icons-material/Castle"; // เพิ่มไอคอนสำหรับส่วนสมาชิก

import bgMusicFile from "./assets/bg-music.mp3";
import bookOpeningSound from "./assets/book-opening.mp3";

import willowImg from "./assets/member/willow.png";
import garethImg from "./assets/member/gareth.png";
import neroImg from "./assets/member/nero.png";
import millerImg from "./assets/member/miller.png";
import valdezImg from "./assets/member/valdez.png";
import julienImg from "./assets/member/julien.png";
// --- CSS ---
import "./index.css";

// --- Theme Settings ---
const theme = createTheme({
  typography: {
    fontFamily: "'Sarabun', 'Maitree', sans-serif",
    h1: { fontFamily: "'MagicSchoolOne', cursive" },
    h2: { fontFamily: "'MagicSchoolOne', cursive" },
    h3: { fontFamily: "'MagicSchoolTwo', cursive" },
    h4: { fontFamily: "'MagicSchoolTwo', cursive" },
    h5: {
      fontFamily: "'Sarabun', 'Maitree', serif",
      fontWeight: 700,
      fontSize: "1.5rem",
    },
    h6: {
      fontFamily: "'Sarabun', 'Maitree', serif",
      fontWeight: 500,
      letterSpacing: 1,
    },
    body1: {
      fontFamily: "'Sarabun', sans-serif",
      fontSize: "1.05rem",
      lineHeight: 1.8,
      fontWeight: 400,
    },
    body2: {
      fontFamily: "'Sarabun', sans-serif",
      fontSize: "0.95rem",
      lineHeight: 1.7,
      fontWeight: 300,
    },
    overline: {
      fontFamily: "'MagicSchoolTwo', cursive",
      letterSpacing: 2,
    },
  },
  palette: {
    mode: "dark",
    background: { default: "#07090F" },
    primary: { main: "#D4AF37" },
    secondary: { main: "#9B111E" },
    text: { primary: "#EAE0D5", secondary: "#B0B8C1" },
  },
});

// --- Custom Hooks & Components ---
const ScrollReveal = ({ children, delay = 0, direction = "up", ...props }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  const getTransform = () => {
    if (isVisible) return "translate(0, 0)";
    switch (direction) {
      case "up":
        return "translateY(50px)";
      case "down":
        return "translateY(-50px)";
      case "left":
        return "translateX(50px)";
      case "right":
        return "translateX(-50px)";
      default:
        return "translateY(50px)";
    }
  };

  return (
    <Box
      ref={domRef}
      sx={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity 0.8s ease-out ${delay}s, transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}s`,
        willChange: "opacity, transform",
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

const MagicalBackground = () => (
  <Box
    sx={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 0,
      pointerEvents: "none",
      overflow: "hidden",
    }}
  >
    <Box
      sx={{
        position: "absolute",
        top: "20%",
        right: "-10%",
        width: "60vw",
        height: "60vw",
        minWidth: "500px",
        minHeight: "500px",
        opacity: 0.03,
        border: "2px dashed #D4AF37",
        borderRadius: "50%",
        animation: "spinGlow 60s linear infinite",
        "&::before": {
          content: '""',
          position: "absolute",
          top: "10%",
          left: "10%",
          right: "10%",
          bottom: "10%",
          border: "1px solid #D4AF37",
          borderRadius: "50%",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          top: "49%",
          left: "-5%",
          right: "-5%",
          height: "2%",
          background: "#D4AF37",
          transform: "rotate(45deg)",
        },
      }}
    />
    <Box
      sx={{
        position: "absolute",
        bottom: "-20%",
        left: "-10%",
        width: "40vw",
        height: "40vw",
        minWidth: "300px",
        minHeight: "300px",
        opacity: 0.04,
        border: "4px double #D4AF37",
        borderRadius: "50%",
        animation: "spinGlowReverse 40s linear infinite",
      }}
    />
    {[...Array(15)].map((_, i) => (
      <Box
        key={i}
        sx={{
          position: "absolute",
          width: Math.random() * 4 + 2 + "px",
          height: Math.random() * 4 + 2 + "px",
          backgroundColor: i % 3 === 0 ? "#FFFDE4" : "#D4AF37",
          borderRadius: "50%",
          top: Math.random() * 100 + "%",
          left: Math.random() * 100 + "%",
          opacity: Math.random() * 0.5 + 0.1,
          boxShadow: "0 0 10px 2px rgba(212, 175, 55, 0.4)",
          animation: `floatingParticle ${Math.random() * 10 + 10}s ease-in-out infinite alternate`,
          animationDelay: `-${Math.random() * 10}s`,
        }}
      />
    ))}
  </Box>
);

const MagicalCard = ({ children, sx, ...otherProps }) => (
  <Paper
    elevation={8}
    sx={{
      bgcolor: "rgba(17, 20, 25, 0.7)",
      backdropFilter: "blur(12px)",
      borderRadius: "8px",
      border: "1px solid rgba(212, 175, 55, 0.15)",
      boxShadow:
        "0 8px 32px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(212, 175, 55, 0.1)",
      p: { xs: 3, md: 4 },
      position: "relative",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      transition:
        "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease",
      "&:hover": {
        transform: "translateY(-6px)",
        boxShadow:
          "0 15px 45px rgba(0, 0, 0, 0.8), inset 0 0 0 1px rgba(212, 175, 55, 0.4)",
      },
      ...sx,
    }}
    {...otherProps}
  >
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        background: "linear-gradient(90deg, transparent, #D4AF37, transparent)",
        opacity: 0.8,
      }}
    />
    {children}
  </Paper>
);

const WarningCard = ({ children, sx }) => (
  <Paper
    elevation={6}
    sx={{
      bgcolor: "rgba(42, 12, 12, 0.7)",
      backdropFilter: "blur(10px)",
      borderRadius: "8px",
      border: "1px solid rgba(116, 0, 1, 0.5)",
      p: { xs: 3, md: 4 },
      position: "relative",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      animation: "pulseGlow 3s infinite alternate",
      transition: "transform 0.3s ease",
      "&:hover": { transform: "scale(1.02)" },
      ...sx,
    }}
  >
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        background: "linear-gradient(90deg, transparent, #9B111E, transparent)",
      }}
    />
    {children}
  </Paper>
);

const SectionTitle = ({ icon: Icon, title }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 2,
      mb: 3,
      borderBottom: "1px solid rgba(212, 175, 55, 0.2)",
      pb: 2,
    }}
  >
    <Box
      sx={{
        p: 1,
        borderRadius: "50%",
        bgcolor: "rgba(212, 175, 55, 0.1)",
        display: "flex",
        color: "primary.main",
        boxShadow: "0 0 15px rgba(212,175,55,0.2)",
      }}
    >
      <Icon sx={{ fontSize: 28 }} />
    </Box>
    <Typography
      variant="h4"
      sx={{
        color: "primary.main",
        fontFamily: "'Henny Penny', cursive",
        fontSize: { xs: "1.5rem", sm: "2.125rem" },
      }}
    >
      {title}
    </Typography>
  </Box>
);

const getHouseTheme = (house) => {
  switch (house) {
    case "Gryffindor":
      return {
        bg: "rgba(68, 14, 14, 0.85)", // สีแดงเข้ม
        glowInside: "rgba(155, 17, 30, 0.15)",
        glowHover: "rgba(155, 17, 30, 0.4)",
      };
    case "Ravenclaw":
      return {
        bg: "rgba(14, 26, 64, 0.85)", // สีน้ำเงินเข้ม
        glowInside: "rgba(34, 47, 91, 0.2)",
        glowHover: "rgba(40, 80, 180, 0.4)",
      };
    case "Hufflepuff":
      return {
        bg: "rgba(55, 46, 15, 0.85)", // สีเหลืองทอง/น้ำตาลเข้ม
        glowInside: "rgba(238, 185, 57, 0.1)",
        glowHover: "rgba(238, 185, 57, 0.3)",
      };
    case "Slytherin":
      return {
        bg: "rgba(20, 50, 30, 0.85)", // สีเขียวเข้ม (เผื่อมีสมาชิกใหม่)
        glowInside: "rgba(42, 98, 61, 0.15)",
        glowHover: "rgba(42, 98, 61, 0.4)",
      };
    default:
      return {
        bg: "rgba(22, 18, 35, 0.85)",
        glowInside: "rgba(138, 43, 226, 0.1)",
        glowHover: "rgba(138, 43, 226, 0.4)",
      };
  }
};

const MemberCard = ({ member }) => {
  const houseTheme = getHouseTheme(member.house);

  return (
    <Paper
      elevation={12}
      sx={{
        // ❌ ลบ maxWidth และ margin ออก
        bgcolor: houseTheme.bg,
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(212, 175, 55, 0.6)",
        borderRadius: "12px",
        p: { xs: 1, sm: 1.5, md: 2 }, // ให้ Padding ลดลงอัตโนมัติบนมือถือ
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%", // ✨ ให้กว้างเต็ม Grid Cell
        height: "100%", // ✨ ให้สูงเท่ากันทุกการ์ด
        boxShadow: `0 10px 30px rgba(0,0,0,0.6), inset 0 0 20px ${houseTheme.glowInside}`,
        transition: "all 0.4s ease",
        "&:hover": {
          transform: "translateY(-10px) scale(1.02)",
          boxShadow: `0 15px 40px rgba(0,0,0,0.8), 0 0 25px ${houseTheme.glowHover}, inset 0 0 15px rgba(212, 175, 55, 0.3)`,
        },
      }}
    >
      {/* ลวดลายตกแต่งมุมการ์ด (ซ่อนบนจอมือถือที่เล็กมากๆ เพื่อไม่ให้รก) */}
      <Box
        sx={{
          display: { xs: "none", sm: "block" },
          position: "absolute",
          top: -6,
          left: -6,
          color: "#D4AF37",
          fontSize: 20,
          textShadow: "0 0 10px #D4AF37",
        }}
      >
        ✦
      </Box>
      <Box
        sx={{
          display: { xs: "none", sm: "block" },
          position: "absolute",
          top: -6,
          right: -6,
          color: "#D4AF37",
          fontSize: 20,
          textShadow: "0 0 10px #D4AF37",
        }}
      >
        ✦
      </Box>
      <Box
        sx={{
          display: { xs: "none", sm: "block" },
          position: "absolute",
          bottom: -6,
          left: -6,
          color: "#D4AF37",
          fontSize: 20,
          textShadow: "0 0 10px #D4AF37",
        }}
      >
        ✦
      </Box>
      <Box
        sx={{
          display: { xs: "none", sm: "block" },
          position: "absolute",
          bottom: -6,
          right: -6,
          color: "#D4AF37",
          fontSize: 20,
          textShadow: "0 0 10px #D4AF37",
        }}
      >
        ✦
      </Box>

      {/* กรอบด้านใน */}
      <Box
        sx={{
          position: "absolute",
          top: 10,
          left: 10,
          right: 10,
          bottom: 10,
          border: "1px solid rgba(212, 175, 55, 0.2)",
          borderRadius: "8px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* พื้นที่รูปภาพ */}
      <Box
        sx={{
          width: "100%",
          aspectRatio: "4/5",
          border: "2px solid rgba(212, 175, 55, 0.5)",
          borderRadius: "6px",
          overflow: "hidden",
          mb: 1.5,
          position: "relative",
          zIndex: 1,
          bgcolor: "#000",
          flexShrink: 0,
        }}
      >
        <Box
          component="img"
          src={member.img}
          alt={member.name}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            transition: "transform 0.5s ease",
            "&:hover": { transform: "scale(1.08)" },
          }}
        />
      </Box>

      {/* ข้อมูลสมาชิก */}
      <Box
        sx={{
          zIndex: 1,
          textAlign: "center",
          width: "100%",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="overline"
          sx={{
            color: "#D4AF37",
            fontFamily: "'Sarabun', sans-serif",
            fontWeight: 600,
            letterSpacing: { xs: 0, sm: 1 },
            lineHeight: 1.2,
            display: "block",
            mb: 0.5,
            fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" }, // ✨ เล็กลงบนมือถือ
            minHeight: { xs: "20px", sm: "28px" },
          }}
        >
          {member.role}
        </Typography>

        <Typography
          variant="h5"
          sx={{
            color: "#FFFDE4",
            fontFamily: "'Sarabun', serif",
            fontWeight: 700,
            mb: 0.5,
            fontSize: { xs: "0.75rem", sm: "0.9rem", md: "1.1rem" }, // ✨ เล็กลงบนมือถือ
            lineHeight: 1.2,
          }}
        >
          {member.name}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            mb: 1.5,
            fontFamily: "'Sarabun', sans-serif",
            fontWeight: 300,
            fontSize: { xs: "0.55rem", sm: "0.7rem", md: "0.8rem" }, // ✨ เล็กลงบนมือถือ
          }}
        >
          ปี {member.year} • {member.house}
        </Typography>

        {/* ปุ่มกด Link */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: { xs: 0.5, sm: 1 },
            mt: "auto",
            width: "100%",
          }}
        >
          <Link
            href={member.accountUrl}
            target="_blank"
            underline="none"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.5,
              bgcolor: "rgba(212,175,55,0.1)",
              py: { xs: 0.3, sm: 0.6 },
              borderRadius: "25px",
              border: "1px solid rgba(212,175,55,0.3)",
              color: "#D4AF37",
              transition: "all 0.2s",
              "&:hover": {
                bgcolor: "rgba(212,175,55,0.2)",
                boxShadow: "0 0 10px rgba(212,175,55,0.3)",
              },
            }}
          >
            <AlternateEmailIcon sx={{ fontSize: { xs: 10, sm: 15 } }} />
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: { xs: "0.5rem", sm: "0.75rem" },
              }}
            >
              {member.account}
            </Typography>
          </Link>

          <Link
            href={member.docUrl}
            target="_blank"
            underline="none"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.5,
              bgcolor: "rgba(212,175,55,0.1)",
              py: { xs: 0.3, sm: 0.6 },
              borderRadius: "25px",
              border: "1px solid rgba(212,175,55,0.3)",
              color: "#D4AF37",
              transition: "all 0.2s",
              "&:hover": {
                bgcolor: "rgba(212,175,55,0.2)",
                boxShadow: "0 0 10px rgba(212,175,55,0.3)",
              },
            }}
          >
            <ArticleIcon sx={{ fontSize: { xs: 10, sm: 15 } }} />
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: { xs: "0.5rem", sm: "0.75rem" },
              }}
            >
              {member.doc}
            </Typography>
          </Link>
        </Box>
      </Box>
    </Paper>
  );
};

// --- ข้อมูลสมาชิกอัปเดตตามบรีฟ ---
const members = [
  {
    role: "ประธาน\n(การตลาด)",
    name: "วิลโลว์ เบลรีฟ",
    year: "6",
    house: "Hufflepuff",
    account: "hwww2-willow",
    accountUrl: "https://bsky.app/profile/hwww2-willow.bsky.social",
    doc: "ข้อมูลตัวละคร",
    docUrl:
      "https://docs.google.com/document/d/1JyetMI4kkphRXkDBlHQob2OjzILaphzlUWR2ipd9ntg/edit?tab=t.0#heading=h.f7sc8xtd9lo",
    img: willowImg,
  },
  {
    role: "รองประธาน\n(นักกรุยทาง)",
    name: "กาเรธ อีแวนส์",
    year: "6",
    house: "Hufflepuff",
    account: "hwww2-gareth",
    accountUrl: "https://bsky.app/profile/hwww2-gareth.bsky.social",
    doc: "ข้อมูลตัวละคร",
    docUrl:
      "https://docs.google.com/document/d/1YDU9nRhhYElncdqjdbYdChnGP6XuQZ7PNmO6Y5FbhEk/edit?tab=t.0",
    img: garethImg,
  },
  {
    role: "สมาชิก",
    name: "เนียโร แลงคาสเตอร์",
    year: "6",
    house: "Ravenclaw",
    account: "hwww2-nero",
    accountUrl: "https://bsky.app/profile/hwww2-nero.bsky.social",
    doc: "ข้อมูลตัวละคร",
    docUrl:
      "https://docs.google.com/document/d/16exHrAEEltFndH-4eIUB1SzlAQGWZnHmDmjF3KruN-A/edit?tab=t.0#heading=h.f7sc8xtd9lo",
    img: neroImg,
  },
  {
    role: "สมาชิก",
    name: "มิลเลอร์ ลอว์สัน",
    year: "6",
    house: "Gryffindor",
    account: "hwww2-miller",
    accountUrl: "https://bsky.app/profile/hwww2-miller.bsky.social",
    doc: "ข้อมูลตัวละคร",
    docUrl:
      "https://docs.google.com/document/d/11kM2yaSseZviwI9MD8ieEwtZfr5HBfvpv8s8pSzAuKg/edit?usp=sharing",
    img: millerImg,
  },
  {
    role: "สมาชิก",
    name: "วาลเดซ บีญาร์เรอัล",
    year: "6",
    house: "Ravenclaw",
    account: "hwww2-valdez",
    accountUrl: "https://bsky.app/profile/hwww2-valdez.bsky.social",
    doc: "ข้อมูลตัวละคร",
    docUrl:
      "https://docs.google.com/document/d/1u_YC29bmvvGVH_p41ocgmPYAvYAV8cSGZ0x4K8_d6gs/edit?tab=t.0#heading=h.f7sc8xtd9lo",
    img: valdezImg,
  },
  {
    role: "สมาชิก",
    name: "จูเลียน เอเดลไวส์",
    year: "6",
    house: "Ravenclaw",
    account: "hwww2-julien",
    accountUrl: "https://bsky.app/profile/hwww2-julien.bsky.social",
    doc: "ข้อมูลตัวละคร",
    docUrl:
      "https://docs.google.com/document/d/1eBIdgWR5X6m6U5jCD8YxUrk9QE2k-oX-bMfljMm2Juo/edit?tab=t.0",
    img: julienImg,
  },
];

// --- Main Application ---
export default function ArcaneApparatusClub() {
  const [hasEntered, setHasEntered] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [isOpening, setIsOpening] = useState(false);
  const [renderContent, setRenderContent] = useState(false);

  const pageTurnSound = useRef(null);
  const bgMusic = useRef(null);

  useEffect(() => {
    if (typeof Audio !== "undefined") {
      pageTurnSound.current = new Audio(bookOpeningSound);
      pageTurnSound.current.volume = 0.8;

      bgMusic.current = new Audio(bgMusicFile);
      bgMusic.current.loop = true;
      bgMusic.current.volume = 0.4;
    }
  }, []);

  const handleOpenGrimoire = () => {
    if (hasEntered) return;

    setHasEntered(true);
    setIsOpening(true);

    if (pageTurnSound.current) {
      pageTurnSound.current
        .play()
        .catch((err) => console.log("Audio error:", err));
    }

    setTimeout(() => {
      if (bgMusic.current) {
        bgMusic.current.play().catch((err) => console.log("Audio error:", err));
      }
    }, 1000);

    setTimeout(() => {
      setRenderContent(true);
    }, 800);

    setTimeout(() => {
      setShowIntro(false);
    }, 3000);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          "body, html": {
            backgroundColor: "#07090F",
            backgroundImage:
              "radial-gradient(circle at 50% 0%, #151A22 0%, #05060A 100%)",
            minHeight: "100vh",
            overflowX: "hidden",
            scrollBehavior: "smooth",
          },
          "::selection": {
            background: "rgba(212, 175, 55, 0.3)",
            color: "#FFFDE4",
          },
          "::-webkit-scrollbar": { width: "8px" },
          "::-webkit-scrollbar-track": { background: "#05060A" },
          "::-webkit-scrollbar-thumb": {
            background: "linear-gradient(180deg, #AA7C11, #D4AF37)",
            borderRadius: "10px",
          },
          "@keyframes pulseGlow": {
            "0%": { boxShadow: "0 0 15px rgba(116, 0, 1, 0.2)" },
            "100%": { boxShadow: "0 0 30px rgba(155, 17, 30, 0.4)" },
          },
          "@keyframes float": {
            "0%": { transform: "translateY(0px)" },
            "50%": { transform: "translateY(-15px)" },
            "100%": { transform: "translateY(0px)" },
          },
          "@keyframes floatingParticle": {
            "0%": { transform: "translate(0, 0) scale(1)" },
            "33%": { transform: "translate(30px, -50px) scale(1.2)" },
            "66%": { transform: "translate(-20px, -100px) scale(0.8)" },
            "100%": { transform: "translate(0, -150px) scale(1)" },
          },
          "@keyframes magicFlash": {
            "0%": { opacity: 0, transform: "scale(0)" },
            "30%": { opacity: 1, transform: "scale(3)" },
            "100%": { opacity: 0, transform: "scale(150)" },
          },
          "@keyframes emergeFromShadows": {
            "0%": {
              opacity: 0,
              filter: "blur(15px)",
              transform: "scale(0.8)",
              letterSpacing: "6px",
            },
            "50%": {
              opacity: 1,
              filter: "blur(0px)",
              transform: "scale(1.05)",
              letterSpacing: "4px",
            },
            "100%": {
              opacity: 1,
              filter: "blur(0px)",
              transform: "scale(1)",
              letterSpacing: "3px",
            },
          },
          "@keyframes shimmeringGold": {
            "0%": { backgroundPosition: "-100% 50%" },
            "100%": { backgroundPosition: "200% 50%" },
          },
          "@keyframes fadeInUpDelay": {
            "0%": {
              opacity: 0,
              transform: "translateY(10px)",
              filter: "blur(5px)",
            },
            "100%": {
              opacity: 1,
              transform: "translateY(0)",
              filter: "blur(0px)",
            },
          },
          // ปรับแอนิเมชันให้แปรผันตามขนาดหน้าจอ (vw) จะได้ไม่ตกขอบบนมือถือ
          "@keyframes wandSwish": {
            "0%": {
              opacity: 0,
              transform: "translate(-30vw, 80px) rotate(-60deg) scale(0.5)",
            },
            "20%": {
              opacity: 1,
              transform: "translate(-15vw, -20px) rotate(10deg) scale(1.5)",
            },
            "50%": {
              transform: "translate(0vw, -40px) rotate(45deg) scale(1.8)",
            },
            "80%": {
              opacity: 1,
              transform: "translate(15vw, -10px) rotate(80deg) scale(1.5)",
            },
            "100%": {
              opacity: 0,
              transform: "translate(30vw, 80px) rotate(120deg) scale(0.5)",
            },
          },
          "@keyframes magicalWiggle": {
            "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
            "25%": { transform: "translateY(-3px) rotate(1.5deg)" },
            "75%": { transform: "translateY(3px) rotate(-1.5deg)" },
          },
          "@keyframes pulseCore": {
            "0%": { transform: "scale(0.8)", opacity: 0.8 },
            "100%": { transform: "scale(1.2)", opacity: 1 },
          },
          "@keyframes pulseAura": {
            "0%": { transform: "scale(0.8)", opacity: 0.5 },
            "100%": { transform: "scale(1.5)", opacity: 1 },
          },
          "@keyframes spinGlow": {
            "0%": { transform: "rotate(0deg)" },
            "100%": { transform: "rotate(360deg)" },
          },
          "@keyframes spinGlowReverse": {
            "0%": { transform: "rotate(0deg)" },
            "100%": { transform: "rotate(-360deg)" },
          },
        }}
      />
      {showIntro && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 9999,
            display: "flex",
            pointerEvents: hasEntered ? "none" : "auto",
            perspective: "2500px",
            backgroundColor: isOpening ? "transparent" : "#07090F",
            transition: "background-color 1.5s ease",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 10,
            }}
          >
            <Box
              sx={{
                width: "15px",
                height: "15px",
                borderRadius: "50%",
                bgcolor: "#fff",
                boxShadow: "0 0 60px 30px #D4AF37, 0 0 100px 50px #F3E5AB",
                opacity: isOpening ? 1 : 0,
                animation: isOpening
                  ? "magicFlash 1.5s ease-out forwards"
                  : "none",
              }}
            />
          </Box>

          <Box
            onClick={handleOpenGrimoire}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              transformOrigin: "left center",
              transform: isOpening ? "rotateY(-110deg)" : "rotateY(0deg)",
              transition:
                "transform 1.5s cubic-bezier(0.645, 0.045, 0.355, 1), opacity 0.8s ease-in 0.7s",
              opacity: isOpening ? 0 : 1,
              bgcolor: "#120C08",
              cursor: hasEntered ? "default" : "pointer",
              backgroundImage: `
                linear-gradient(90deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 8%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.6) 98%, #D4AF37 100%),
                radial-gradient(circle at center, #1F150D 0%, #0A0604 100%)
              `,
              borderLeft: {
                xs: "15px solid #050302",
                sm: "30px solid #050302",
                md: "50px solid #050302",
              },
              boxShadow: isOpening
                ? "none"
                : "15px 0 40px rgba(0,0,0,0.9), inset -5px 0 15px rgba(0,0,0,0.5)",
              zIndex: 20,
              transformStyle: "preserve-3d",
              "&:hover .magical-seal": {
                transform: "translateX(-50%) scale(1.05)",
                textShadow: "0 0 20px #D4AF37",
                filter: "drop-shadow(0 0 15px rgba(212,175,55,0.8))",
              },
            }}
          >
            {/* --- กรอบสี่เหลี่ยมหน้าปก --- */}
            <Box
              sx={{
                position: "absolute",
                top: { xs: "3%", md: "4%" },
                // <--- แก้ไขจุดนี้: ใช้ calc() ดันขอบซ้ายหลบรอยพับสันหนังสือ เพื่อให้กรอบอยู่ตรงกลางปกพอดี
                left: {
                  xs: "calc(3% + 25px)",
                  sm: "calc(4% + 40px)",
                  md: "calc(4% + 50px)",
                },
                right: { xs: "3%", md: "4%" },
                bottom: { xs: "3%", md: "4%" },
                border: "4px solid rgba(212, 175, 55, 0.3)",
                borderRadius: "4px",
                boxShadow: "inset 0 0 20px rgba(212, 175, 55, 0.05)",
                pointerEvents: "none",
              }}
            >
              {[
                [-6, -6, "top", "left"],
                [-6, -6, "top", "right"],
                [-6, -6, "bottom", "left"],
                [-6, -6, "bottom", "right"],
              ].map(([y, x, yPos, xPos], i) => (
                <Box
                  key={i}
                  sx={{
                    position: "absolute",
                    [yPos]: y,
                    [xPos]: x,
                    width: 12,
                    height: 12,
                    border: "2px solid #D4AF37",
                    borderRadius: "50%",
                    bgcolor: "#120C08",
                  }}
                />
              ))}
            </Box>

            {/* --- รอยพับสันหนังสือ (Hinge Crease) --- */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: { xs: "25px", sm: "40px", md: "50px" },
                height: "100%",
                background:
                  "linear-gradient(90deg, rgba(0,0,0,0.95) 0%, rgba(20,12,8,0.5) 30%, transparent 100%)",
                boxShadow: "inset 6px 0 10px rgba(0,0,0,0.8)",
                zIndex: 20,
                pointerEvents: "none",
              }}
            />

            {/* --- เส้นทองตกแต่งร่องสันหนังสือ (Gutter Detail) --- */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: { xs: "8px", sm: "15px", md: "20px" },
                width: "4px",
                height: "100%",
                background:
                  "linear-gradient(180deg, transparent 5%, rgba(212,175,55,0.6) 20%, rgba(212,175,55,0.6) 80%, transparent 95%)",
                boxShadow: "1px 0 2px rgba(0,0,0,0.8)",
                zIndex: 20,
                pointerEvents: "none",
              }}
            />

            {/* --- สันนูนของหนังสือเวทมนตร์ (Raised Bands) --- */}
            {["15%", "50%", "85%"].map((topPos, i) => (
              <Box
                key={i}
                sx={{
                  position: "absolute",
                  top: topPos,
                  left: { xs: "-15px", sm: "-30px", md: "-50px" },
                  width: { xs: "15px", sm: "30px", md: "50px" },
                  height: { xs: "12px", sm: "16px", md: "18px" },
                  background:
                    "linear-gradient(90deg, #050302 0%, #3a2618 50%, #050302 100%)",
                  boxShadow:
                    "0 6px 8px rgba(0,0,0,0.9), inset 0 2px 3px rgba(255,255,255,0.1)",
                  borderTop: "1px solid rgba(212,175,55,0.2)",
                  borderBottom: "2px solid #000",
                  borderTopRightRadius: "3px",
                  borderBottomRightRadius: "3px",
                  zIndex: 20,
                }}
              />
            ))}

            {/* --- พื้นที่เนื้อหาและตัวหนังสือ --- */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                // <--- แก้ไขจุดนี้: เปลี่ยนจาก paddingRight เป็น paddingLeft เพื่อดันเนื้อหาให้ตรงกลางของพื้นที่หน้าปกที่เหลือ
                paddingLeft: { xs: "25px", sm: "40px", md: "50px" },
                zIndex: 25,
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  zIndex: 25,
                  animation: "wandSwish 2.5s ease-in-out forwards",
                  pointerEvents: "none",
                  width: 0,
                  height: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  // <--- แก้ไขจุดนี้: ขยับแกนกลางแอนิเมชันไม้กายสิทธิ์นิดหน่อยให้ตรงกับตัวหนังสือ
                  marginLeft: { xs: "25px", sm: "40px", md: "50px" },
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    width: { xs: "80px", sm: "120px" },
                    height: { xs: "80px", sm: "120px" },
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle, rgba(212, 175, 55, 0.4) 0%, rgba(170, 124, 17, 0) 70%)",
                    animation: "pulseAura 2s ease-in-out infinite alternate",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    width: { xs: "100px", sm: "160px" },
                    height: { xs: "100px", sm: "160px" },
                    animation: "spinGlow 6s linear infinite",
                    "&::before, &::after": {
                      content: '""',
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      width: "100%",
                      height: "2px",
                      background:
                        "radial-gradient(ellipse at center, #FFFFFF 0%, #D4AF37 40%, transparent 70%)",
                    },
                    "&::before": { transform: "translate(-50%, -50%)" },
                    "&::after": {
                      transform: "translate(-50%, -50%) rotate(90deg)",
                    },
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    width: { xs: "60px", sm: "100px" },
                    height: { xs: "60px", sm: "100px" },
                    opacity: 0.6,
                    animation: "spinGlowReverse 4s linear infinite",
                    "&::before, &::after": {
                      content: '""',
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      width: "100%",
                      height: "2px",
                      background:
                        "radial-gradient(ellipse at center, #FFFDE4 0%, #AA7C11 50%, transparent 70%)",
                    },
                    "&::before": {
                      transform: "translate(-50%, -50%) rotate(45deg)",
                    },
                    "&::after": {
                      transform: "translate(-50%, -50%) rotate(-45deg)",
                    },
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    bgcolor: "#FFFFFF",
                    boxShadow: "0 0 20px 8px #FFFDE4, 0 0 40px 15px #D4AF37",
                    animation: "pulseCore 0.15s infinite alternate",
                  }}
                />
              </Box>

              <Box
                sx={{
                  animation:
                    "emergeFromShadows 2.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards",
                  filter: "drop-shadow(0 0 20px rgba(212, 175, 55, 0.6))",
                }}
              >
                <Box
                  sx={{ animation: "magicalWiggle 4s ease-in-out infinite" }}
                >
                  <Typography
                    variant="h1"
                    sx={{
                      fontFamily: "'MagicSchoolTwo', sans-serif",
                      textAlign: "center",
                      px: 2,
                      background:
                        "linear-gradient(110deg, #AA7C11 0%, #D4AF37 30%, #FFFDE4 50%, #D4AF37 70%, #AA7C11 100%)",
                      backgroundSize: "200% auto",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontSize: { xs: "2rem", sm: "3rem", md: "6rem" },
                      whiteSpace: "nowrap",
                    }}
                  >
                    Arcane Apparatus Club
                  </Typography>
                </Box>
              </Box>
              <Typography
                variant="overline"
                sx={{
                  fontFamily: "'Henny Penny', 'Charm', cursive",
                  color: "rgba(243, 229, 171, 0.8)",
                  letterSpacing: { xs: "3px", sm: "6px" },
                  mt: 2,
                  opacity: 0,
                  animation: "fadeInUpDelay 1.5s ease forwards 1s",
                  textShadow: "0 0 10px rgba(212, 175, 55, 0.6)",
                }}
              >
                #HWWW_SS2
              </Typography>
              {!hasEntered && (
                <Typography
                  variant="caption"
                  sx={{
                    fontFamily: "'Sarabun', sans-serif",
                    color: "rgba(212, 175, 55, 0.6)",
                    letterSpacing: "2px",
                    mt: 4,
                    opacity: 0,
                    animation: "fadeInUpDelay 1.5s ease forwards 1.5s",
                    fontSize: "0.75rem",
                  }}
                >
                  ( คลิกเพื่อเปิด )
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      )}

      {/* --- Main Content --- */}
      <Fade in={renderContent} timeout={1500}>
        <Box
          sx={{
            py: { xs: 6, md: 10 },
            px: { xs: 2, md: 4 },
            maxWidth: 1050,
            mx: "auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <MagicalBackground />

          {/* --- Hero Section --- */}
          <ScrollReveal direction="up">
            <Box sx={{ textAlign: "center", mb: 8, position: "relative" }}>
              <Box
                sx={{
                  position: "absolute",
                  top: "20%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 200,
                  height: 200,
                  background:
                    "radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 60%)",
                  filter: "blur(25px)",
                  zIndex: -1,
                  pointerEvents: "none",
                }}
              />
              <Box
                component="img"
                src="logo.gif"
                alt="Arcane Apparatus Club Logo"
                sx={{
                  width: { xs: 80, sm: 110 },
                  height: "auto",
                  mb: 3,
                  filter: "drop-shadow(0 0 15px rgba(212,175,55,0.5))",
                  animation: "float 5s ease-in-out infinite",
                }}
              />
              <Typography
                variant="overline"
                sx={{
                  fontFamily: "'Henny Penny', cursive",
                  color: "primary.main",
                  display: "block",
                  mb: 1,
                  opacity: 0.9,
                  letterSpacing: { xs: 1, sm: 2, md: 5 },
                  textShadow: "0 0 15px rgba(212, 175, 55, 0.4)",
                  fontSize: { xs: "0.75rem", md: "1rem" },
                }}
              >
                Hogwarts School of Witchcraft and Wizardry
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  fontFamily: "'MagicSchoolOne', sans-serif",
                  fontSize: { xs: "2.2rem", sm: "3rem", md: "4.5rem" },
                  mb: 2,
                  background:
                    "linear-gradient(45deg, #FFFDE4, #D4AF37, #AA7C11)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0px 4px 20px rgba(212, 175, 55, 0.3)",
                  letterSpacing: 2,
                }}
              >
                Arcane Apparatus Club
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 5,
                  gap: { xs: 1, sm: 2 },
                }}
              >
                <Box
                  sx={{
                    height: "1px",
                    width: { xs: "20px", sm: "40px" },
                    background: "linear-gradient(90deg, transparent, #D4AF37)",
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    color: "text.secondary",
                    letterSpacing: { xs: 1, sm: 2 },
                    fontWeight: 300,
                    fontFamily: "'Sarabun', 'Maitree', sans-serif",
                    fontSize: { xs: "0.9rem", sm: "1.25rem" },
                  }}
                >
                  ชมรมวิจัยอุปกรณ์เวทมนตร์
                </Typography>
                <Box
                  sx={{
                    height: "1px",
                    width: { xs: "20px", sm: "40px" },
                    background: "linear-gradient(270deg, transparent, #D4AF37)",
                  }}
                />
              </Box>

              {/* Glowing Tag */}
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1.5,
                  bgcolor: "rgba(212, 175, 55, 0.08)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(212, 175, 55, 0.4)",
                  px: { xs: 3, md: 4 },
                  py: 1.2,
                  borderRadius: "50px",
                  boxShadow:
                    "0 8px 25px rgba(212, 175, 55, 0.15), inset 0 0 10px rgba(212, 175, 55, 0.1)",
                  transition:
                    "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  "&:hover": {
                    bgcolor: "rgba(212, 175, 55, 0.15)",
                    transform: "translateY(-3px)",
                    boxShadow:
                      "0 12px 30px rgba(212, 175, 55, 0.25), inset 0 0 15px rgba(212, 175, 55, 0.2)",
                  },
                }}
              >
                <AutoFixHighIcon
                  sx={{ fontSize: { xs: 18, sm: 20 }, color: "primary.main" }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    color: "primary.main",
                    fontFamily: "'Charm', sans-serif",
                    letterSpacing: 1.5,
                    pt: 0.5,
                    fontWeight: 600,
                    fontSize: { xs: "0.85rem", sm: "0.95rem" },
                  }}
                >
                  #HWWW_ArcaneAClub
                </Typography>
              </Box>
            </Box>
          </ScrollReveal>

          {/* --- Roleplay Notice Banner --- */}
          <ScrollReveal direction="up" delay={0.2}>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 8 }}>
              <Paper
                elevation={0}
                sx={{
                  bgcolor: "rgba(25, 20, 15, 0.4)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(212, 175, 55, 0.2)",
                  borderLeft: "3px solid #D4AF37",
                  borderRight: "3px solid #D4AF37",
                  borderRadius: "8px",
                  px: { xs: 2, md: 5 },
                  py: 1.5,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    fontStyle: "italic",
                    letterSpacing: 0.5,
                    fontFamily: "'Sarabun', sans-serif",
                    textAlign: "center",
                    fontSize: { xs: "0.8rem", sm: "0.95rem" },
                  }}
                >
                  <strong
                    style={{
                      color: "#D4AF37",
                      fontWeight: 500,
                      marginRight: "8px",
                    }}
                  >
                    หมายเหตุ :
                  </strong>
                  เป็นเพียงข้อมูลสำหรับประกอบการโรลเพลย์
                  ตัวละครไม่จำเป็นต้องมีเงื่อนไขตามที่กำหนด
                </Typography>
              </Paper>
            </Box>
          </ScrollReveal>

          {/* --- 1. รายละเอียด & กิจกรรมชมรม & Tip เพิ่มเติม --- */}
          <ScrollReveal direction="up" delay={0.1}>
            <MagicalCard
              sx={{
                mb: 4,
                p: { xs: 3, sm: 4, md: 5 },
                bgcolor: "rgba(10, 8, 12, 0.85)",
              }}
            >
              <SectionTitle
                icon={AutoStoriesIcon}
                title="รายละเอียดและกิจกรรมชมรม"
              />

              <Box
                sx={{
                  position: "relative",
                  p: { xs: 3, md: 5 },
                  mb: 6,
                  mt: 2,
                  bgcolor: "rgba(22, 17, 13, 0.6)",
                  border: "1px solid rgba(212, 175, 55, 0.4)",
                  boxShadow: "inset 0 0 30px rgba(0,0,0,0.8)",
                  display: "flex",
                  flexDirection: "column",
                  zIndex: 1,
                }}
              >
                {/* ดาวตกแต่งที่มุมทั้ง 4 */}
                {[
                  [-14, -12, "top", "left"],
                  [-14, -12, "top", "right"],
                  [-14, -12, "bottom", "left"],
                  [-14, -12, "bottom", "right"],
                ].map(([y, x, yPos, xPos], i) => (
                  <Box
                    key={i}
                    sx={{
                      position: "absolute",
                      [yPos]: y,
                      [xPos]: x,
                      color: "#D4AF37",
                      fontSize: 24,
                      bgcolor: "transparent",
                    }}
                  >
                    ✦
                  </Box>
                ))}

                <Box
                  sx={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    right: 10,
                    bottom: 10,
                    border: "1px solid rgba(212, 175, 55, 0.15)",
                    pointerEvents: "none",
                  }}
                />

                <Typography
                  variant="body1"
                  sx={{
                    color: "text.primary",
                    mb: 2,
                    textAlign: { xs: "left", md: "justify" },
                    textJustify: "inter-word",
                    fontFamily: "'Sarabun', sans-serif",
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      float: "left",
                      fontSize: { xs: "2.5rem", md: "3.5rem" },
                      lineHeight: "0.8",
                      pt: "8px",
                      pr: "12px",
                      color: "#D4AF37",
                      fontFamily: "'Charm', cursive",
                      textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                    }}
                  >
                    ช
                  </Box>
                  มรมวิจัยอุปกรณ์เวทมนตร์ถูกก่อตั้งขึ้นเพื่อเป็นพื้นที่ชุมนุมของเหล่าพ่อมดแม่มดผู้หลงใหลในการหลอมรวมศาสตร์เวทมนตร์เข้ากับระบบกลไกไปจนถึงงานประดิษฐ์สร้างสรรค์
                  โดยมีที่ตั้งเป็นห้องว่างห้องหนึ่งลึกเข้าไปในปราสาทฮอกวอตส์
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: "text.primary",
                    mb: 3,
                    textAlign: { xs: "left", md: "justify" },
                    fontFamily: "'Sarabun', sans-serif",
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  ประตูชมรมแห่งนี้เปิดกว้างต้อนรับทุกคนเสมอ
                  ไม่เว้นแม้แต่ผู้ที่ไม่ได้เป็นสมาชิก
                  ทุกคนสามารถก้าวเท้าเข้ามาเยี่ยมชมบรรยากาศได้โดยไม่จำเป็นต้องเอ่ยปากขออนุญาต
                </Typography>

                <Box
                  sx={{
                    p: { xs: 2, sm: 2.5 },
                    bgcolor: "rgba(0, 0, 0, 0.4)",
                    borderLeft: "4px solid #D4AF37",
                    position: "relative",
                    overflow: "hidden",
                    zIndex: 2,
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: -25,
                      right: -10,
                      opacity: 0.05,
                      transform: "rotate(-15deg)",
                    }}
                  >
                    <WarningAmberIcon
                      sx={{ fontSize: 100, color: "#D4AF37" }}
                    />
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      lineHeight: 1.8,
                      position: "relative",
                      fontFamily: "'Sarabun', sans-serif",
                    }}
                  >
                    (ทว่าโปรดระมัดระวังอย่าเผลอไปหยิบจับสิ่งใดก่อนขอเชียวล่ะ
                    ถ้าไม่อยากเสี่ยงสูญเสียอวัยวะเพราะอุปกรณ์เกิดทำงานผิดพลาด
                    หรือต้องเจอกับเสียงแผดลั่นของสมาชิกสักคนที่ตะโกนขับไล่
                    โทษฐานดันไปแตะต้อง{" "}
                    <Box
                      component="strong"
                      sx={{
                        color: "#D4AF37",
                        fontSize: "1.05rem",
                        fontWeight: 600,
                        letterSpacing: 1,
                      }}
                    >
                      ลูกรัก
                    </Box>{" "}
                    ของพวกเขาเข้า)
                  </Typography>
                </Box>
              </Box>

              <Typography
                variant="body2"
                sx={{
                  color: "text.primary",
                  mb: 2,
                  fontStyle: "italic",
                  fontWeight: 500,
                  fontFamily: "'Sarabun', sans-serif",
                }}
              >
                กิจกรรมภายในชมรมมีความหลากหลาย
                ขึ้นอยู่กับความถนัดของสมาชิกแต่ละคนว่าต้องการทำงานแบบใด
                รวบรวมไว้ได้คร่าว ๆ ดังนี้ :
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {/* --- กิจกรรมที่ 1 --- */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: { xs: 1.5, md: 2 },
                    bgcolor: "rgba(20, 15, 10, 0.4)",
                    borderRadius: "8px",
                    border: "1px solid rgba(212, 175, 55, 0.1)",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      bgcolor: "rgba(212, 175, 55, 0.08)",
                      borderColor: "rgba(212, 175, 55, 0.3)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: "6px",
                      bgcolor: "rgba(212, 175, 55, 0.1)",
                      display: "flex",
                      mr: 2,
                      flexShrink: 0,
                    }}
                  >
                    <BuildIcon sx={{ color: "primary.main", fontSize: 22 }} />
                  </Box>
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "primary.main",
                        fontWeight: 600,
                        fontSize: "1rem",
                        mb: 0.2,
                        fontFamily: "'Sarabun', sans-serif",
                      }}
                    >
                      รับซ่อมอุปกรณ์เวทมนตร์
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        fontSize: "0.85rem",
                        lineHeight: 1.5,
                        fontFamily: "'Sarabun', sans-serif",
                      }}
                    >
                      อาทิ ไม้กวาด (รวมไปถึงของจิปาถะอย่าง กระเป๋า เสื้อ รองเท้า
                      ด้วย)
                    </Typography>
                  </Box>
                </Box>

                {/* --- กิจกรรมที่ 2 --- */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: { xs: 1.5, md: 2 },
                    bgcolor: "rgba(20, 15, 10, 0.4)",
                    borderRadius: "8px",
                    border: "1px solid rgba(212, 175, 55, 0.1)",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      bgcolor: "rgba(212, 175, 55, 0.08)",
                      borderColor: "rgba(212, 175, 55, 0.3)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: "6px",
                      bgcolor: "rgba(212, 175, 55, 0.1)",
                      display: "flex",
                      mr: 2,
                      flexShrink: 0,
                    }}
                  >
                    <ChatIcon sx={{ color: "primary.main", fontSize: 22 }} />
                  </Box>
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "primary.main",
                        fontWeight: 600,
                        fontSize: "1rem",
                        mb: 0.2,
                        fontFamily: "'Sarabun', sans-serif",
                      }}
                    >
                      ให้คำปรึกษาเกี่ยวกับอุปกรณ์ฯ
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        fontSize: "0.85rem",
                        lineHeight: 1.5,
                        fontFamily: "'Sarabun', sans-serif",
                      }}
                    >
                      (เป็นคำปรึกษาทั่วไป
                      หากอยากได้ของมีประโยชน์เชิญร้านที่ตรอกไดอากอน)
                    </Typography>
                  </Box>
                </Box>

                {/* --- กิจกรรมที่ 3 --- */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: { xs: 1.5, md: 2 },
                    bgcolor: "rgba(20, 15, 10, 0.4)",
                    borderRadius: "8px",
                    border: "1px solid rgba(212, 175, 55, 0.1)",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      bgcolor: "rgba(212, 175, 55, 0.08)",
                      borderColor: "rgba(212, 175, 55, 0.3)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: "6px",
                      bgcolor: "rgba(155, 17, 30, 0.15)",
                      display: "flex",
                      mr: 2,
                      flexShrink: 0,
                    }}
                  >
                    <CleaningServicesIcon
                      sx={{ color: "secondary.main", fontSize: 22 }}
                    />
                  </Box>
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "secondary.main",
                        fontWeight: 600,
                        fontSize: "1rem",
                        mb: 0.2,
                        fontFamily: "'Sarabun', sans-serif",
                      }}
                    >
                      สำคัญ
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        fontSize: "0.85rem",
                        lineHeight: 1.5,
                        fontFamily: "'Sarabun', sans-serif",
                      }}
                    >
                      ทำความสะอาดห้องชมรมทุกสุดสัปดาห์ (ขาดไม่ได้!)
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* --- WarningCard (Tip เพิ่มเติม) --- */}
              <WarningCard
                sx={{
                  mt: 3,
                  p: { xs: 3, md: 3 },
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: { xs: "center", sm: "flex-start" },
                  gap: 3,
                  bgcolor: "rgba(30, 25, 15, 0.7)",
                  border: "1px solid rgba(212, 175, 55, 0.4)",
                  animation: "none",
                  boxShadow: "0 4px 20px rgba(212, 175, 55, 0.15)",
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
                  }}
                />

                <Box
                  sx={{ position: "relative", flexShrink: 0, mt: { sm: 1 } }}
                >
                  <LightbulbIcon
                    sx={{
                      color: "primary.main",
                      fontSize: 40,
                      filter: "drop-shadow(0 0 10px rgba(212,175,55,0.6))",
                    }}
                  />
                </Box>
                <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "primary.main",
                      fontFamily: "'Sarabun', sans-serif",
                      fontWeight: 700,
                      mb: 1.5,
                      letterSpacing: 1,
                    }}
                  >
                    Tip เพิ่มเติม
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1.5,
                      textAlign: "left",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1.5,
                        alignItems: "flex-start",
                      }}
                    >
                      <ChevronRightIcon
                        sx={{ color: "primary.main", fontSize: 20, mt: 0.2 }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          color: "rgba(234, 224, 213, 0.9)",
                          lineHeight: 1.7,
                          fontFamily: "'Sarabun', sans-serif",
                        }}
                      >
                        ห้องชมรมรกมาก
                        เต็มไปด้วยอุปกรณ์เวทมนตร์เกลื่อนกลาดและลอยอยู่กลางอากาศ
                        ระวังเท้าและหัวของคุณเอาไว้ให้ดี
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1.5,
                        alignItems: "flex-start",
                      }}
                    >
                      <ChevronRightIcon
                        sx={{ color: "primary.main", fontSize: 20, mt: 0.2 }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          color: "rgba(234, 224, 213, 0.9)",
                          lineHeight: 1.7,
                          fontFamily: "'Sarabun', sans-serif",
                        }}
                      >
                        มีชื่อเสียงโจษจันว่าเป็นชมรมที่มีทุกอย่างยกเว้นทางเดิน
                        (แต่ดูเหมือนว่าปัญหานี้กำลังจะหายไปเพราะรองประธานชมรม)
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </WarningCard>
            </MagicalCard>
          </ScrollReveal>

          {/* --- 2. คุณสมบัติสมาชิก --- */}
          <ScrollReveal direction="left" delay={0.1}>
            <MagicalCard sx={{ mb: 6, p: { xs: 3, sm: 4, md: 5 } }}>
              <SectionTitle icon={AutoFixHighIcon} title="คุณสมบัติของสมาชิก" />

              {/* เพิ่ม Grid container ตรงนี้เพื่อให้ Grid item ทำงานได้อย่างถูกต้องและ responsive */}
              <Grid container spacing={{ xs: 2, md: 4 }}>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}
                  >
                    <Box
                      sx={{
                        mt: 0.8,
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        bgcolor: "primary.main",
                        flexShrink: 0,
                        boxShadow: "0 0 5px #D4AF37",
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.primary",
                        lineHeight: 1.6,
                        fontFamily: "'Sarabun', sans-serif",
                      }}
                    >
                      ชื่นชอบการสร้างสรรค์ / ค้นคว้า / ประดิษฐ์ สิ่งของ <br />
                      <Box
                        component="span"
                        sx={{
                          color: "#B0B8C1",
                          fontSize: "0.85rem",
                          fontFamily: "'Sarabun', sans-serif",
                        }}
                      >
                        (ไม่จำเป็นว่าต้องเป็นอุปกรณ์เวทมนตร์)
                      </Box>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}
                  >
                    <Box
                      sx={{
                        mt: 0.8,
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        bgcolor: "primary.main",
                        flexShrink: 0,
                        boxShadow: "0 0 5px #D4AF37",
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.primary",
                        lineHeight: 1.6,
                        fontFamily: "'Sarabun', sans-serif",
                      }}
                    >
                      มีสัญชาตญาณเอาตัวรอดสูง(?)
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </MagicalCard>
          </ScrollReveal>
          {/* --- 3. ทำเนียบสมาชิก (Members) --- */}
          <ScrollReveal direction="up" delay={0.2}>
            <Box sx={{ mt: 8, mb: 4 }}>
              <SectionTitle icon={CastleIcon} title="ทำเนียบสมาชิก" />

              {/* ✨ ใช้ MUI Box แบบ Grid ไม่ง้อ Tailwind การันตีช่องว่าง 100% ✨ */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  columnGap: { xs: 2, sm: 4, md: 6 }, // ช่องว่างซ้าย-ขวา
                  rowGap: { xs: 5, sm: 6, md: 8 }, // ✨ ช่องว่างบน-ล่าง (ตัวแก้ปัญหาการ์ดติดกัน)
                  maxWidth: "950px", // คุมขนาดไม่ให้กว้างเกินไป
                  mx: "auto", // จัดให้อยู่กลางจอ
                  mt: 5,
                  px: 2,
                  justifyItems: "center", // ดันการ์ดแต่ละใบให้อยู่ตรงกลางช่องของตัวเอง
                }}
              >
                {members.map((member, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      animation: `fadeInUpDelay 0.8s ease forwards ${0.2 * index}s`,
                      opacity: 0,
                    }}
                  >
                    <Box sx={{ width: "100%", maxWidth: "250px" }}>
                      <MemberCard member={member} />
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </ScrollReveal>
        </Box>
      </Fade>
    </ThemeProvider>
  );
}
