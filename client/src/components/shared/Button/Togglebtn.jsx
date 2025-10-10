import PropTypes from 'prop-types'
import useAuth from '../../../hooks/useAuth'
const ToggleBtn = ({ toggleHandler }) => {
  const {toggle}=useAuth();
  // console.log(toggle);
  return (
    <>
      <label
        htmlFor='Toggle3'
        className='inline-flex w-full justify-center items-center px-2 rounded-md cursor-pointer text-gray-800'
      >
        <input
          onChange={toggleHandler}
          defaultChecked={toggle}
          id='Toggle3'
          type='checkbox'
          className='hidden peer'
        />
        <span className='px-4 py-1 rounded-l-md bg-green-800 peer-checked:bg-gray-300 text-white'>
          Host
        </span>
        <span className='px-4 py-1 rounded-r-md bg-gray-500 peer-checked:bg-green-800 text-white'>
          Guest
        </span>
      </label>
    </>
  )
}

ToggleBtn.propTypes = {
  toggleHandler: PropTypes.func,
}
export default ToggleBtn