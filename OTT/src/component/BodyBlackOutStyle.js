// 모달 뒤쪽 배경 음영
import "../static/scss/blackoutStyle.scss"

const BodyBlackoutStyle = ({ onModalVisible }) => {
    return (
      <div
        className="body-blackout-style"
        onClick={() => onModalVisible(false)}
      ></div>
    );
};

export default BodyBlackoutStyle