import { Dialog, Transition } from "@headlessui/react";
import { ChangeEvent, Fragment, useState } from "react";
import CustomButton from "../CustomButton/CustomButton";
import SelectCountry from "../SelectCountry/SelectCountry";
// interface banned countries
interface BlacklistedCountries {
  [key: string]: string;
}

export default function MyModal() {
  let [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

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
                      onChange={function (
                        e: ChangeEvent<HTMLSelectElement>
                      ): void {
                        throw new Error("Function not implemented.");
                      }}
                    />
                    <button>
                      <p>Ban Country</p>
                    </button>
                  </form>
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
