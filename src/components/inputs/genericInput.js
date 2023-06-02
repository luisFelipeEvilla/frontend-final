export default function GenericInput({ value, setValue, placeholder, type }) {
    return (
        <div className="form-group ">
            <input
                className="form-control form-control-user mt-4"
                type={type}
                value={value}
                onChange={(event) => setValue(event.target.value)}
                placeholder={placeholder}
                style={{ fontFamily: "Arial", border: "solid", borderColor: "#673ab7", borderRadius: 0, borderWidth: "2px" }}

            />
        </div>
    )
}