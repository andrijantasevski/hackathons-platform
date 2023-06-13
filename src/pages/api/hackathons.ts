import { NextApiRequest, NextApiResponse } from "next";

export type Hackathon = {
  id: number;
  date: Date;
  totalPeople: number;
  title: string;
};

const hackathons = [
  {
    id: 1,
    status: "to-do",
    event_data: [
      {
        id: 1,
        date: "2023-06-13T21:57:18+0000",
        totalPeople: 40,
        title: "Hackathons platform",
      },
      {
        id: 2,
        date: "2023-06-17T14:30:00+0000",
        totalPeople: 60,
        title: "Artificial Intelligence for Healthcare",
      },
      {
        id: 3,
        date: "2023-06-23T08:30:00.000Z",
        totalPeople: 30,
        title: "Data Analytics for Business",
      },
      {
        id: 4,
        date: "2023-06-27T11:30:00.000Z",
        totalPeople: 20,
        title: "Web Development and Design",
      },
    ],
  },
  {
    id: 2,
    status: "in-progress",
    event_data: [
      {
        id: 1,
        date: "2023-06-15T10:00:00.000Z",
        totalPeople: 25,
        title: "Mobile App Development",
      },
      {
        id: 2,
        date: "2023-06-19T09:00:00.000Z",
        totalPeople: 35,
        title: "Blockchain Solutions",
      },
      {
        id: 3,
        date: "2023-06-25T13:15:00.000Z",
        totalPeople: 45,
        title: "Cybersecurity Solutions",
      },
      {
        id: 4,
        date: "2023-07-01T12:45:00.000Z",
        totalPeople: 30,
        title: "AR/VR Innovations",
      },
    ],
  },
  {
    id: 3,
    status: "done",
    event_data: [
      {
        id: 1,
        date: "2023-06-21T16:45:00+0000",
        totalPeople: 50,
        title: "Internet of Things (IoT) Innovations",
      },
      {
        id: 2,
        date: "2023-06-29T15:00:00+0000",
        totalPeople: 55,
        title: "Machine Learning Applications",
      },
    ],
  },
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return res.status(200).json(hackathons);
}
