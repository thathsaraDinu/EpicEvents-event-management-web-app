export function AddPromotionStep3({startDate, endDate, handleChange}){
    return (
      <div className="transition-all duration-500">
        <div></div>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            name="startDate"
            className={`border-solid border-2`}
            value={startDate}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div>
          <label>End Date:</label>
          <input
            type="date"
            name="endDate"
            className={`border-solid border-2`}
            value={endDate}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>
    );
}