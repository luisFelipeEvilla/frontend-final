export default function PrimaryButton({type, text}) {
    return (
        <div>
            <button
                className="btn text-white mt-5 rounded-pill"
                style={{ width: 170, height: 60, backgroundColor: "#673ab7" }}
                type={type}
            >
                {text}
            </button>
        </div>
    )
}