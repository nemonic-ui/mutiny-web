import { useNavigate } from "@solidjs/router";
import { createSignal, Suspense } from "solid-js";

import {
    Button,
    ConfirmDialog,
    DefaultMain,
    ExternalLink,
    MutinyWalletGuard,
    showToast
} from "~/components";
import { useI18n } from "~/i18n/context";
import { useMegaStore } from "~/state/megaStore";
import { eify } from "~/utils";

import { AddFederationForm } from "../settings";

export function AddFederation() {
    const i18n = useI18n();
    const navigate = useNavigate();
    const [_state, _actions, sw] = useMegaStore();

    const [confirmOpen, setConfirmOpen] = createSignal(false);
    const [confirmLoading, setConfirmLoading] = createSignal(false);

    async function handleSkip() {
        setConfirmLoading(true);
        try {
            await sw.create_node_manager_if_needed();
            navigate("/");
        } catch (e) {
            console.error(e);
            setConfirmLoading(false);
            showToast(eify(e));
        }
    }

    return (
        <MutinyWalletGuard>
            <DefaultMain>
                <div class="mx-auto flex max-w-[20rem] flex-col items-center gap-4 py-4">
                    <h1 class="text-3xl font-semibold">
                        {i18n.t("setup.federation.pick")}
                    </h1>
                    <p class="text-pretty text-center text-xl font-light text-neutral-200">
                        {i18n.t("settings.manage_federations.description")}
                    </p>
                    <p class="text-pretty text-center text-xl font-light text-neutral-200">
                        {i18n.t("settings.manage_federations.descriptionpart2")}
                    </p>

                    <Button onClick={() => setConfirmOpen(true)} intent="text">
                        {i18n.t("setup.skip")}
                    </Button>
                    <ConfirmDialog
                        open={confirmOpen()}
                        loading={confirmLoading()}
                        onConfirm={handleSkip}
                        onCancel={() => setConfirmOpen(false)}
                    >
                        {i18n.t("setup.federation.skip_confirm")}
                    </ConfirmDialog>
                    <Suspense>
                        <AddFederationForm setup />
                    </Suspense>
                    <p class="text-pretty text-center text-xl font-light text-neutral-200">
                        <ExternalLink href="https://fedimint.org/docs/intro">
                            {i18n.t("settings.manage_federations.learn_more")}
                        </ExternalLink>
                    </p>
                </div>
            </DefaultMain>
        </MutinyWalletGuard>
    );
}
