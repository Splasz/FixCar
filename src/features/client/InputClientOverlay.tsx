import Overlay from "../../components/Overlay";
import React, { useState } from "react";
import { Textarea } from "@headlessui/react";
import { FaCheck } from "react-icons/fa6";
import axios from "axios";

type InputClientOverlay = {
  isOpen: boolean;
  onClose: () => void;
};

function InputClientOverlay({ isOpen, onClose }: InputClientOverlay) {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    phone: "",
    email: "",
    text: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const resetForm = () => {
    setFormData({
      name: "",
      lastname: "",
      phone: "",
      email: "",
      text: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSuccessMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.lastname.trim()) {
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost/react_backend/addClient.php",
        formData
      );
      setSuccessMessage("Klient został dodany pomyślnie");
      console.log(res.data);
      resetForm();
    } catch (error) {
      console.error("Blad przy dodawaniu zadania:", error);
    }
  };

  return (
    <Overlay isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-2.5">
        <div className="border-b-1 border-highlight text-2xl">
          Dodaj Nowego Klienta
        </div>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex gap-3.5">
            <label className="flex flex-col">
              <span className=" after:ml-0.5 after:text-red-500 after:content-['*']">
                Imię
              </span>
              <input
                placeholder="Jan"
                name="name"
                type="text"
                className="client peer"
                required
                value={formData.name}
                onChange={handleChange}
              />
              <p className="mt-1 hidden text-xs text-accent peer-invalid:block">
                Imię jest wymagane
              </p>
            </label>

            <label className="flex flex-col">
              <span className="after:ml-0.5 after:text-red-500 after:content-['*']">
                Nazwisko
              </span>
              <input
                placeholder="Kowalski"
                name="lastname"
                type="text"
                className="client peer"
                required
                value={formData.lastname}
                onChange={handleChange}
              />
              <p className="mt-1 hidden text-xs text-accent peer-invalid:block">
                Nazwisko jest wymagane
              </p>
            </label>
          </div>
          <div>
            <label className="flex flex-col">
              Telefon
              <input
                placeholder="+48"
                maxLength={9}
                name="phone"
                type="text"
                className="client w-1/2"
                value={formData.phone}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label className="flex flex-col">
              E-mail
              <input
                placeholder="example@email.com"
                type="email"
                name="email"
                className="client w-1/2"
                value={formData.email}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label className="flex flex-col">
              Notatka
              <Textarea
                placeholder="..."
                className="client_note h-24"
                name="text"
                value={formData.text}
                onChange={handleChange}
              ></Textarea>
            </label>
          </div>
          <div>
            <button
              type="submit"
              className="flex items-center gap-2.5 text-xl p-2 rounded-2xl text-background bg-primary w-1/3 cursor-pointer"
            >
              <FaCheck />
              Dodaj
            </button>
          </div>
          {successMessage && (
            <div>
              <p className="text-accent2">{successMessage}</p>
            </div>
          )}
        </form>
      </div>
    </Overlay>
  );
}

export default InputClientOverlay;
