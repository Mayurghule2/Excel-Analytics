const initialState = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  address: '',
  country: '',
  state: '',
  city: '',
  pincode: ''
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGNUP':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default userReducer;