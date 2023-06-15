import { NextApiRequest, NextApiResponse } from "next";

export type Certificate = {
  id: number;
  hackathon_name: string;
  certificate_url: string;
  email: string;
};

const certificates = [
  {
    id: 1,
    hackathon_name: "Data analysis",
    certificate_url: "",
    email: "demo@gmail.com",
  },
  {
    id: 2,
    hackathon_name: "Web Development",
    certificate_url: "",
    email: "demo@gmail.com",
  },
  {
    id: 3,
    hackathon_name: "Data",
    certificate_url: "",
    email: "demo@gmail.com",
  },
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.email) {
    if (typeof req.query.email !== "string") {
      return res.status(400).json({ data: null, message: "Success" });
    }

    const email = req.query.email;

    const filteredCertificates = certificates.filter(
      (certificate) => certificate.email === email
    );

    if (filteredCertificates.length === 0) {
      return res.status(404).json({
        data: null,
        message: "We found no certificates for the provided email!",
      });
    }

    return res
      .status(200)
      .json({ data: filteredCertificates, message: "Success" });
  }

  return res.status(200).json({ data: certificates, message: "Success" });
}
