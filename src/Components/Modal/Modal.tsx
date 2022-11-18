import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

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
                  <div>
                    <p>Update.</p>
                  </div>

                  <div>
                    <button type="button" onClick={closeModal}>
                      Got it, thanks!
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
