const job = [
  {
    _id: "650dfda1294584bea503cd80",
    company: "Twimm",
    position: "Analyst Programmer",
    job_status: "assessment",
    job_type: "intern",
    location: "Barra do Corda",
    created_by: "6501d4b3ae40d538eea5c524",
    createdAt: "2023-04-29T08:33:35.000Z",
    updatedAt: "2023-09-25T16:59:51.543Z",
    __v: 0,
    jobId: "1234",
  },
  {
    _id: "650dfda1294584bea503cd6c",
    company: "Kayveo",
    position: "Biostatistician I",
    job_status: "accepted",
    job_type: "intern",
    location: "Veliko Tŭrnovo",
    created_by: "6501d4b3ae40d538eea5c524",
    createdAt: "2023-03-24T21:27:41.000Z",
    updatedAt: "2023-03-24T21:27:41.000Z",
    __v: 0,
  },
  {
    _id: "650dfda1294584bea503cd8c",
    company: "Ooba",
    position: "Compensation Analyst",
    job_status: "assessment",
    job_type: "intern",
    location: "Mapulo",
    created_by: "6501d4b3ae40d538eea5c524",
    createdAt: "2023-06-04T16:37:09.000Z",
    updatedAt: "2023-06-04T16:37:09.000Z",
    __v: 0,
  },
];

job.forEach((item, index) => {
  console.log(index, " ", item);
});
