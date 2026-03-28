import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { produce } from 'immer';
import { UserType } from '../../storage/constant';

interface AuthState {
  userDetails: any | null;
  userType: UserType | null;
}

const initialState: AuthState = {
  userDetails: null,
  userType: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthSlice(state, action: PayloadAction<Partial<AuthState>>) {
      const { userDetails, userType } = action.payload;
      return produce(state, draftState => {
        if (userDetails !== undefined) {
          draftState.userDetails = userDetails;
        }
        if (userType !== undefined) {
          draftState.userType = userType;
        }
      });
    },

    resetAuthState(state) {
      state.userDetails = null;
      state.userType = null;
    },
  },
});

export const { setAuthSlice, resetAuthState } = authSlice.actions;
export default authSlice.reducer;
