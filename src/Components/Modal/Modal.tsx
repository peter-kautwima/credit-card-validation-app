import { Dialog, Transition } from "@headlessui/react";
import { ChangeEvent, Fragment, useState } from "react";
import countries from "../../data/countries";
import { Country } from "../../types";
import CustomButton from "../CustomButton/CustomButton";
import SelectCountry from "../SelectCountry/SelectCountry";

type Props = {
  bannedCountries: Country[];
  setBannedCountries: (bannedCountries: Country[]) => void;
};

export default function MyModal({
  bannedCountries,
  setBannedCountries,
}: Props) {
  let [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const getSelectedCountry = (selectedCountry: string): Country | undefined => {
    const country = countries.find(
      (country) => country.value === selectedCountry
    );
    return country;
  };

  const handleCountrySelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const countryObj = getSelectedCountry(e.target.value);
    if (countryObj) {
      setSelectedCountry(countryObj);
    }
  };

  return (
    <>
      <div>
        <button type="button" onClick={openModal}>
          Manage Blacklisted Countries
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" onClose={closeModal}>
          <Transition.Child as={Fragment}>
            <div />
          </Transition.Child>

          <div>
            <div>
              <Transition.Child as={Fragment}>
                <Dialog.Panel>
                  <Dialog.Title as="h3">
                    Manage Blackisted Countries
                  </Dialog.Title>
                  <form>
                    <SelectCountry
                      label="Select Country"
                      onChange={handleCountrySelect}
                    />
                    <CustomButton
                      onClick={() => {
                        console.log("adding banned country", selectedCountry);

                        if (selectedCountry) {
                          console.log([...bannedCountries, selectedCountry]);
                          setBannedCountries([
                            ...bannedCountries,
                            selectedCountry,
                          ]);
                        }
                      }}
                    >
                      Ban Country
                    </CustomButton>
                  </form>
                  <ul>
                    {bannedCountries.map((country) => (
                      <li key={country.value}>{country.label}</li>
                    ))}
                  </ul>
                  <div>
                    <h4>Banned Countries</h4>
                    {/* map over banned countries and display them here with a delete button */}
                    <button onClick={closeModal}>
                      <p>Cancel</p>
                    </button>
                    <button type="button" onClick={closeModal}>
                      Save & Exit!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
