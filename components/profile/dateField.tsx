// the options aren't displayed in the mobile preview in chrome
// -> options are visible in normal preview
// testing on an actual mobile device needs to be done

export default function DateField() {
  function generateArrayOfDays() {
    const days = [];

    for (let i = 1; i <= 31; i++) {
      days.push(i);
    }
    return days;
  }

  function generateArrayOfMonths() {
    const months = [];

    for (let i = 1; i <= 12; i++) {
      months.push(i);
    }
    return months;
  }

  function generateArrayOfYears() {
    const max = new Date().getFullYear() - 17;
    const years = [];

    for (let i = 1930; i <= max; i++) {
      years.push(i);
    }
    return years;
  }

  const maxYear = Number(generateArrayOfYears().slice(-1));

  return (
    <div className="pb-14">
      <h3 className="text-purple text-xl font-quicksand pb-4 font-bold">
        What's Your Date of Birth?
      </h3>
      <input
        placeholder="DD"
        className="w-16 h-10 pl-1.5 text-center font-quicksand placeholder:font-quicksand placeholder-lightpurple placeholder:text-center outline-purple rounded-md border-lightpurple border text-purple"
        min="1"
        max="31"
        list="days"
        required
      ></input>
      <datalist id="days">
        {generateArrayOfDays().map(day => (
          <option key={day} value={day} />
        ))}
      </datalist>
      <input
        placeholder="MM"
        className="w-16 h-10 pl-1.5 text-center font-quicksand placeholder:font-quicksand placeholder-lightpurple placeholder:text-center mx-4 outline-purple rounded-md border-lightpurple border text-purple"
        min="1"
        max="12"
        list="months"
        required
      ></input>
      <datalist id="months">
        {generateArrayOfMonths().map(month => (
          <option key={month} value={month} />
        ))}
      </datalist>
      <input
        placeholder="YYYY"
        className="w-20 h-10 pl-1.5 text-center font-quicksand placeholder:font-quicksand placeholder-lightpurple placeholder:text-center outline-purple rounded-md border-lightpurple border text-purple"
        min="1930"
        max={maxYear}
        list="years"
        required
      ></input>
      <datalist id="years">
        {generateArrayOfYears().map(year => (
          <option key={year} value={year} />
        ))}
      </datalist>
    </div>
  );
}
