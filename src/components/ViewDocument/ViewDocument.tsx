import React, { ReactNode, useContext, useEffect } from "react";
import { Avatar, Grid, Typography } from "@mui/material";
import { styles } from "./viewDocument.styles";
import { Section } from "../Section/Section";
import { AppContext } from "../../contexts/appContext";
import { useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";
import { FirestoreModel } from "../../lib/firestoreModel";
import { FirestoreEditedItem, FormDocument } from "../FormDocument/FormDocument";
import { FirestoreDocument, SvgElement } from "../../lib/types";
import { InlineLabelValue } from "../InlineLabelValue/InlineLabelValue";
import { Spacer } from "../Spacer/Spacer";
import { formatDate } from "../../helpers/utils";
import { TwoSideViewContainer, TwoSideViewFixed, TwoSideViewFluid } from "../TwoSideView";


interface ViewDocumentProps<T extends FirestoreDocument> {
  children?: React.ReactNode;
  model: FirestoreModel<T>;
  avatarIcon?: SvgElement;
  infos?: React.ReactNode;
  avatarBackgroundColor?: string;
  sidebar?: ReactNode;
  onItemChange?: (nextItem: T | null) => void;
  onSaveItem?: (nextItem: FirestoreEditedItem, previousItem?: T | null) => Promise<void>;
}


export const ViewDocument = <T extends FirestoreDocument, >({
  model,
  infos,
  sidebar,
  children,
  onSaveItem,
  onItemChange,
  avatarIcon: AvatarIcon,
  avatarBackgroundColor,
}: ViewDocumentProps<T>) => {
  const { id } = useParams();
  const { item } = useDocument(model, id);
  const { isLoading } = useContext(AppContext);

  useEffect(() => {
    if (onItemChange) {
      onItemChange(item);
    }
  }, [item, onItemChange]);

  const handleSaveItem = async (nextItem: FirestoreEditedItem, previousItem?: T | null) => {
    if (onSaveItem) {
      await onSaveItem(nextItem, previousItem);
    }
  }

  console.log("--- item", model.schema, item);
  return (
    <TwoSideViewContainer>
      <TwoSideViewFluid>
        {model.schema.length > 0 && (
          <Section title="Contenu">
            <FormDocument
              item={item}
              schema={model.schema}
              isLoading={isLoading}
              onChange={handleSaveItem}
            />
          </Section>
        )}
        {children}
      </TwoSideViewFluid>

      {item && (
        <TwoSideViewFixed>
          <Grid container direction="column" alignItems="center">
            <Section title="Informations">
              <Grid container direction="column" alignItems="center">
                <Avatar css={styles.avatar} sx={{ bgcolor: avatarBackgroundColor}}>
                  {AvatarIcon && <AvatarIcon fontSize="large" />}
                </Avatar>
                <Spacer />
                <InlineLabelValue label="Id:"><Typography>{item.id}</Typography></InlineLabelValue>
                <InlineLabelValue label="Créé le:"><Typography>{formatDate(item.createdAt)}</Typography></InlineLabelValue>
                <InlineLabelValue label="Mise à jour le:"><Typography>{formatDate(item.createdAt)}</Typography></InlineLabelValue>
                {infos}
              </Grid>
            </Section>

            {sidebar}
          </Grid>
        </TwoSideViewFixed>
      )}
    </TwoSideViewContainer>
  );
}
