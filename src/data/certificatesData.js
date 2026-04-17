/**
 * certificatesData.js
 * --------------------------------------------------
 * Replace the placeholder values below with your real
 * certificate information.
 *
 * Fields:
 *   id          – unique key (string)
 *   title       – certificate name
 *   org         – issuing organization
 *   date        – issue date (e.g. "Jan 2025")
 *   credentialId – (optional) credential / verification ID
 *   logo        – URL or import path for the org logo / icon
 *   proof       – URL to certificate image or verification page
 *   proofType   – "image" | "link"
 *                  • "image" → opens a lightbox modal
 *                  • "link"  → opens the URL in a new tab
 */

export const certificates = [
  {
    id: 'cert-1',
    title: 'React (Basic)',
    org: 'HackerRank',
    date: 'Apr 2026',
    credentialId: 'A5565E7DF0FD',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png',
    proof: 'https://res.cloudinary.com/dmqkfsaca/image/upload/v1776452317/react_basic_certificate_1_-1_hd5jzh.png',
    proofType: 'image',
  },
  {
    id: 'cert-2',
    title: 'Frontend Developer (React)',
    org: 'HackerRank',
    date: 'Apr 2026',
    credentialId: 'AC87EA42E289',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png',
    proof: 'https://res.cloudinary.com/dmqkfsaca/image/upload/v1776452579/frontend_developer_react_certificate-1_xnynud.png',
    proofType: 'image',
  },
  {
    id: 'cert-3',
    title: 'Node (Basic)',
    org: 'HackerRank',
    date: 'Apr 2026',
    credentialId: '5C9FFBAF1FA7',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png',
    proof: 'https://res.cloudinary.com/dmqkfsaca/image/upload/v1776452869/nodejs_basic_certificate-1_w95vej.png',
    proofType: 'image',
  },
]
