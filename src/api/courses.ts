import axios from "axios";

const api = axios.create({
  baseURL: "https://api.coursera.org/api",
  timeout: 10000,
});

const COURSESERVICE = {
  getCourses: async () => {
    try {
      const response = await api.get(
        "/courses.v1",
        {
          params: {
            start: 0,
            limit: 100,
            fields:
              "id,shortName,name,description,photoUrl,partnerIds,instructorIds,startDate,workload,domainTypes",
          },
        }
      );

      return response.data.elements; // 👈 clean data
    } catch (error) {
      console.error("Failed to fetch courses", error);
      throw error;
    }
  },
};

export default COURSESERVICE;
