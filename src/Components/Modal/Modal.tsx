import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import styles from "./Modal.module.scss";

type Props = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ title, isOpen, onClose, children }: Props) {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" onClose={onClose}>
          <Transition.Child as={Fragment}>
            <div />
          </Transition.Child>
          <Transition.Child as={Fragment}>
            <Dialog.Panel className={styles.modal}>
              <div>
                <Dialog.Title as="h3">
                  {title}
                  <button onClick={onClose}>X</button>
                </Dialog.Title>
                <div className={styles.body}>{children}</div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
