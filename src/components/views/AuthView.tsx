import { useState } from 'react';
import { useFormik } from 'formik';
import RtInput from '../atoms/Input/Input.js';
import RtButton from '../atoms/Button/Button.js';
import { fetchAuthLogin } from '../../api/index.js';

type PropsType = {
  // eslint-disable-next-line no-unused-vars
  onAuthenticate: (state: boolean, token?: string) => void
};
type FormDataType = {
  login: string;
  password: string;
};
type ErrorsType = {
  login?: string;
  password?: string;
};

const validate = (values: FormDataType): ErrorsType => {
  const errors: ErrorsType = {};

  /* Login */
  if (!values.login) {
    errors.login = 'Required';
  } else if (!/[A-Za-z0-9]{1,30}/.test(values.login)) {
    errors.login = 'Invalid value';
  }

  /* Password */
  if (!values.password) {
    errors.password = 'Required';
  } else if (!/[A-Za-z0-9@#$%^&+=]{1,30}/.test(values.password)) {
    errors.password = 'Invalid value';
  }

  return errors;
};

export default function AuthView({ onAuthenticate }: PropsType) {
  const [hasError, setErrorState] = useState(false);

  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    validate,
    onSubmit: async (values: FormDataType): Promise<void> => {
      try {
        // progressBar.start();
        const { data } = await fetchAuthLogin({ ...values });
        onAuthenticate(true, data.token);
      } catch (err) {
        onAuthenticate(false);
        setErrorState(true);
      } finally {
        // progressBar.finish()
      }
    },
  });

  let formErrorMessage = null;
  if (hasError) {
    formErrorMessage = (
      <div className="row">
        <div className="rt-col-12 sp-t-1-3 flex-end-top color-error">
          <p className="floating-placeholder">Correct login and password required!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="row valign-wrapper mt-2">
      <form onSubmit={formik.handleSubmit} className="col s6 offset-s3">
        <RtInput
          id="login"
          name="login"
          type="text"
          value={formik.values.login}
          label="Login"
          hasError={formik.touched.login && !!formik.errors.login}
          errorMessage={formik.errors.login}
          onChange={formik.handleChange}
        />

        <RtInput
          id="password"
          name="password"
          type="password"
          value={formik.values.password}
          label="Password"
          hasError={formik.touched.password && !!formik.errors.password}
          errorMessage={formik.errors.password}
          onChange={formik.handleChange}
        />

        <RtButton type="submit" customClasses="mt-1" />

        {formErrorMessage}
      </form>
    </div>
  );
}
