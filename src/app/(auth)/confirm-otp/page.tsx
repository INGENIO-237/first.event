"use client";
import { useGetCurrentUser, useLoginWithOtp, useResendOtp } from "@/_services/auth.service";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import { otpConfirmSchema } from "@/schema/AuthValidation";
import { OTPData } from "@/utils/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Dot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldError, useForm } from "react-hook-form";
import { toast } from "sonner";
import logo from "/public/assets/logo.png";

const otpLength = 5;
const OTPPage = () => {
  const [otp, setOtp] = useState<string>("");
  const [timer, setTimer] = useState<number>(59); // Initialisation à 60 secondes
  const [disabled, setDisabled] = useState<boolean>(true); // Bouton désactivé au départ
  const [loginInfo, setLoginInfo] = useState({ "email": null, "password": null });
  const router = useRouter();

  const { resendOtp, data, error, isPending } = useResendOtp();
  const { confirmLogin, data: confirmData, error: confirmError, isPending: isConfirmPending } = useLoginWithOtp();
  const { getCurrentUser, isPending: userCheckPending, error: userError, data: currentUser } = useGetCurrentUser();

  const { register, handleSubmit, formState: { errors } } = useForm<OTPData>({
    resolver: zodResolver(otpConfirmSchema),
  });

  const isButtonDisabled = () => {
    if (otp.length < 5 || errors?.otp || isConfirmPending || userError) {
      return true;
    }
    return false;
  };

  useEffect((): (() => void) => {
    let countdown: NodeJS.Timeout | undefined;
    if (timer > 0) {
      countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (isConfirmPending) {
      setDisabled(true); // Désactiver à nouveau le bouton
    } else {
      setDisabled(false);
    }

    return () => clearInterval(countdown);
  }, [timer, isConfirmPending]);

  useEffect(() => {
    setLoginInfo(JSON.parse(localStorage.getItem("loginInfo") || "{'email': '', 'password': ''}"));
  }, []);

  //Resend the OTP
  const resendCode = async (): Promise<void> => {
    if (loginInfo.email) {
      resendOtp({ email: loginInfo.email })
        .then((data) => {
          toast.success('Code OTP renvoyé')
        })
        .catch((e) => {
          console.log(e);
          for (const error of e.response.data) {
            toast.error(error.message);
          }
        });
      setTimer(59);
      setDisabled(true);
    }
    else {
      router.push("/login");
    }
  };

  //After getCurrentUser
  useEffect(() => {
    if (!userCheckPending && !userError && currentUser) {
      if (currentUser.interests.length > 0) {
        setTimeout(() => {
          router.push("/home");
        }, 2000);
      }
      else {
        setTimeout(() => {
          router.push("/welcome");
        }, 2000);
      }
    }
  }, [router, currentUser, userCheckPending, userError]);
  const onSubmit = (data: OTPData) => {
    //get the email store in the local storage

    // TODO: send data to backend and wait for the response

    if (loginInfo.email && loginInfo.password) {
      const payload = {
        otp: parseInt(data.otp),
        email: loginInfo.email,
        password: loginInfo.password
      }

      confirmLogin(payload).then((data) => {
        const { otpGenerated, refreshToken, accessToken } = data;
        if (otpGenerated) {

        } else {
          //store in the localStorage the refreshToken and accessToken
          localStorage.setItem("refreshToken", refreshToken);
          localStorage.setItem("accessToken", accessToken);
          localStorage.removeItem("loginInfo");

          //Verify if the user has interests
          getCurrentUser();
        }
      })
        .catch((e) => {
          console.log(e);
          for (const error of e.response.data) {
            toast.error(error.message);
          }
        });
    }
    else {
      toast.error("Veuillez remplir tous les champs");
      router.push("/login");
    }

  };

  return (
    <div className="min-h-screen md:flex flex-row overflow-x-hidden">
      <div className="w-full min-h-screen md:w-1/2 p-4 md:p-8 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <div className="flex justify-start items-center">
            <Link href="/" className="mb-4 md:mb-0">
              <Image
                priority
                src={logo}
                alt="FirstEvent Logo"
                width={150}
                height={37.5}
                className="mb-6 w-60"
              />
            </Link>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold mb-6 text-first_violet">
            Confirmation OTP
          </h1>
          <span className="text-[#484848] font-normal text-sm w-8/12 md:w-6/12">
            Pour des mesures de securité, nous avons besoin de confirmer votre
            identité. Veuillez insérer le code de validation à 5 chiffres que
            vous avez reçu par mail ou par SMS.
          </span>
          <form
            className="flex flex-col gap-3 md:gap-6 my-4  "
            onSubmit={handleSubmit((d) => onSubmit(d))}
          >
            <span className="font-bold text-2xl text-[#484848] ">
              Saisir le Code OTP
            </span>
            <div className="w-full">
              <InputOTP
                maxLength={otpLength}
                pattern={REGEXP_ONLY_DIGITS}
                value={otp}
                {...register("otp")}
                onChange={setOtp}
              >
                {[...Array(otpLength)].map((q, index) => {
                  return (
                    <OTPIn message={errors?.otp} index={index} key={index} />
                  );
                })}
              </InputOTP>
              {errors?.otp && (
                <p className="text-red-500">{errors?.otp?.message}</p>
              )}
            </div>
            {timer > 0 ? (<div className="flex justify-end text-[#484848]">
              {`00:${timer < 10 ? `0${timer}` : timer}`}{" "}
            </div>) : ''}

            <div className="flex items-start md:items-center justify-between">
              <span className="font-bold text-lg text-[#484848] ">
                Je n&apos;ai pas reçu de code
              </span>
              <button
                style={{ opacity: disabled ? 0.5 : 1 }}
                onClick={resendCode}
                disabled={disabled}
                className="rounded bg-first_violet text-white p-2 mt-2"
              >
                Renvoyer le code
              </button>
            </div>
            <div className="flex flex-col items-center">
              <button
                type="submit"
                disabled={isButtonDisabled()}
                className={cn(
                  isButtonDisabled()
                    ? "cursor-not-allowed bg-gray-400"
                    : "bg-first_orange hover:bg-orange-600 transition duration-300",
                  "w-full p-2 border rounded text-white "
                )}
              >
                Confirmer
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="bg-white w-1/2 h-full min-h-md hidden md:flex">
        <Image
          src="/assets/images/auth-image2.png"
          priority
          alt="Next.js Logo"
          className="w-full flex object-cover justify-center h-screen "
          width={800}
          height={0}
        />
      </div>
    </div>
  );
};

const OTPIn = ({ message, index }: { message?: string | FieldError, index: number }) => {
  return (
    <>
      <InputOTPGroup>
        <InputOTPSlot
          index={index}
          className={cn(
            "",
            message &&
            "border-red-500 focus:border-blue-500 "
          )}
        />
      </InputOTPGroup>
      {index !== otpLength - 1 && <Dot />}
    </>
  )
}

export default OTPPage;
