import React, { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const fallbackIcons = [
  "https://img.icons8.com/color/96/company.png",
  "https://img.icons8.com/color/96/briefcase.png",
  "https://img.icons8.com/color/96/bar-chart.png",
  "https://img.icons8.com/color/96/organization.png",
  "https://img.icons8.com/color/96/business.png",
];

async function getCompanyLogo(name: string): Promise<string> {
  if (!name) return getRandomFallbackIcon();

  const cleanName = name
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(" ")[0];
  const logoUrl = `https://logo.clearbit.com/${cleanName}.com`;

  try {
    const res = await fetch(logoUrl, { method: "HEAD" });
    if (res.ok) return logoUrl;
  } catch (error) {
    console.log(error);
  }

  return getRandomFallbackIcon();
}

function getRandomFallbackIcon(): string {
  const randomIndex = Math.floor(Math.random() * fallbackIcons.length);
  return fallbackIcons[randomIndex];
}

interface CompanyLogoProps {
  name: string;
  size?: number;
}

export const CompanyLogo: React.FC<CompanyLogoProps> = ({
  name,
  size = 40,
}) => {
  const [logo, setLogo] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getCompanyLogo(name).then((url) => {
      setLogo(url);
      setLoading(false);
    });
  }, [name]);

  if (loading) {
    return (
      <Skeleton className='rounded' style={{ width: size, height: size }} />
    );
  }

  return (
    <img
      src={logo}
      alt={name}
      className='rounded object-cover'
      style={{ width: size, height: size }}
      onError={(e) => {
        e.currentTarget.src = getRandomFallbackIcon();
      }}
    />
  );
};
