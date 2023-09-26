import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { END_POINT } from '@/config/end-point'


export const vacancySlice = createSlice({
  name: 'vacancy',
  // данные по умолчанию
  initialState: {
    vacancies: [],
    vacancy: {},
    specializations: [],
    cities: [],
    experiences: [],
    skills: [],
    employmentTypes: []
  },
  reducers: {
    setMyVacancies: (state, action) => {
      state.vacancies = action.payload.vacancies
    },
    setVacancy: (state, action) => {
      state.resume = action.payload.resume
    },
    handleDeleteVacancy: (state, action) => {
      let vacancies = [...state.vacancies];
      vacancies = vacancies.filter(item => item.id !== action.payload)
      state.vacancies = vacancies
    },
    setSpecialization: (state, action) => {
      state.specializations = action.payload
    },
    setCities: (state, action) => {
      state.cities = action.payload
    },
    setExperiences: (state, action) => {
      state.experiences = action.payload
    },
    setSkills: (state, action) => {
      state.skills = action.payload
    },
    setEmploymentTypes: (state, action) => {
      state.employmentTypes = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setMyVacancies, setVacancy, handleDeleteVacancy,  setSpecialization, setCities, setExperiences, setSkills, setEmploymentTypes} = vacancySlice.actions


export const getMyVacancies = () => async (dispatch) => {
  try {
    const res = await axios.get(`${END_POINT}/api/vacancy`)
    dispatch(setMyVacancies({vacancies: res.data}))
  } catch (error) {
    alert("Что то пошло не так, сообщите о ошибке тех спецам сайта")
  }
}
export const getSpecializations = () => async (dispatch) => {
  try {
    const res = await axios.get(`${END_POINT}/api/specializations`)
    dispatch(setSpecialization(res.data))
  } catch (error) {
    alert("Что то пошло не так, сообщите о ошибке тех спецам сайта")
  }
}
export const getCities = () => async (dispatch) => {
  try {
    const res = await axios.get(`${END_POINT}/api/region/cities`)
    dispatch(setCities(res.data))
  } catch (error) {
    alert("Что то пошло не так, сообщите о ошибке тех спецам сайта")
  }
}
export const getExperiences = () => async (dispatch) => {
  try {
    const res = await axios.get(`${END_POINT}/api/experiences`)
    dispatch(setExperiences(res.data))
  } catch (error) {
    alert("Что то пошло не так, сообщите о ошибке тех спецам сайта")
  }
}
export const getSkills = () => async (dispatch) => {
  try {
    const res = await axios.get(`${END_POINT}/api/skills/getAllSkills`)
    dispatch(setSkills(res.data))
  } catch (error) {
    alert("Что то пошло не так, сообщите о ошибке тех спецам сайта")
  }
}
export const getEmploymentTypes = () => async (dispatch) => {
  try {
    const res = await axios.get(`${END_POINT}/api/employment-types`)
    dispatch(setEmploymentTypes(res.data))
  } catch (error) {
    alert("Что то пошло не так, сообщите о ошибке тех спецам сайта")
  }
}

export const createVacancy = (sendData, router) => async (dispatch) => {
  try {
    const res = await axios.post(`${END_POINT}/api/vacancy`, sendData)
    router.push('/vacancy');
  } catch (error) {
    console.log(error);
    alert("Что то пошло не так, сообщите о ошибке тех спецам сайта")
  }
}

export const deleteVacancy = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`${END_POINT}/api/vacancy/${id}`)
    dispatch(handleDeleteVacancy(id));
  } catch (error) {
    console.log(error);
    alert("Что то пошло не так, сообщите о ошибке тех спецам сайта")
  }
}

// export const getResumeById = (id) => async (dispatch) => {
//   try {
//     const res = await axios.get(`${END_POINT}/api/resume/${id}`)
//     dispatch(setResume({resume: res.data}))
//   } catch (error) {
//     alert("Что то пошло не так, сообщите о ошибке тех спецам сайта")
//   }
// }

// export const editResume = (sendData, router) => async (dispatch) => {
//   try {
//     const res = await axios.put(`${END_POINT}/api/resume`, sendData)
//     router.push('/resumes');
//   } catch (error) {
//     console.log(error);
//     alert("Что то пошло не так, сообщите о ошибке тех спецам сайта")
//   }
// }


export default vacancySlice.reducer