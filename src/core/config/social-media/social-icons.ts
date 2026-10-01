import { IconType } from "react-icons";
import {
    FaBluesky, FaDiscord, FaEnvelope, FaFacebook, FaGithub, FaGitlab, FaGlobe, FaInstagram, FaLink,
    FaLinkedinIn, FaMastodon, FaTiktok, FaXTwitter, FaYoutube
} from "react-icons/fa6";

const SOCIAL_ICONS: Record<string, IconType> = {
    bluesky: FaBluesky,
    discord: FaDiscord,
    email: FaEnvelope,
    facebook: FaFacebook,
    github: FaGithub,
    gitlab: FaGitlab,
    instagram: FaInstagram,
    linkedin: FaLinkedinIn,
    mastodon: FaMastodon,
    tiktok: FaTiktok,
    website: FaGlobe,
    x: FaXTwitter,
    youtube: FaYoutube,
};

/** Platforms shown in the "work" group; the rest are personal social networks. */
export const WORK_PLATFORMS = ['linkedin', 'github', 'gitlab', 'email', 'website'];

/** Icon for a contract platform; unknown platforms get a generic link icon. */
export const getSocialIcon = (platform: string): IconType => SOCIAL_ICONS[platform] ?? FaLink;
