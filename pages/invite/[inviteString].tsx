import { httpsCallable } from "firebase/functions";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  GreetingsTextRequest,
  InviteUserDataRequest,
  InviteUserDataResponse,
  SetOrRemoveContactRequest,
} from "shared";
import InvalidInvite from "../../components/invite/InvalidInvite";
import Loading from "../../components/invite/Loading";
import ValidInvite from "../../components/invite/ValidInvite";
import NavigationInvite from "../../components/navigation/NavigationInvite";
import { functions } from "../../config/firebase";
export default function InvitePage() {
  const router = useRouter();
  const inviteString = router.query.inviteString as string;
  const [userName, setUserName] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      if (!inviteString) return;
      try {
        const res = await getUserInfo({ inviteString: inviteString });
        setUserName(res.userName);
      } catch (e) {
      } finally {
        setLoading(false);
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inviteString]);

  return (
    <>
      <Head>
        <title>StopSpend - Invite Link</title>
      </Head>
      <NavigationInvite />
      {loading ? (
        <Loading />
      ) : userName === undefined ? (
        <InvalidInvite />
      ) : (
        <ValidInvite
          userName={userName}
          onSubmit={async (
            name: string,
            phone: string,
            kind: "Set" | "Remove"
          ) => {
            await setOrRemoveContact({
              inviteString: inviteString!,
              kind: kind,
              name: name,
              phone: phone,
            });
            sendGreeting({
              contactName: name,
              userName: userName,
              contactPhone: phone,
              inviteString: inviteString!,
            });
          }}
        />
      )}
    </>
  );
}

async function getUserInfo(
  request: InviteUserDataRequest
): Promise<InviteUserDataResponse> {
  return (await httpsCallable(functions, "invite-getUserInfo")(request))
    .data as InviteUserDataResponse;
}

async function setOrRemoveContact(request: SetOrRemoveContactRequest) {
  return (await httpsCallable(functions, "invite-setOrRemoveContact")(request))
    .data as void;
}

async function sendGreeting(request: GreetingsTextRequest) {
  return (await httpsCallable(functions, "twilio-sendGreeting")(request))
    .data as void;
}
