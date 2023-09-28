import React, { useEffect } from "react";
import Filters from "../../components/filters";
import Footer from "../../components/footer";
import {
  footerAllrightsReserved,
  helpLink,
  privacyAndPolicy,
  termsAndUsage,
} from "../../constants";

import useStore from "../../store";

import * as S from "./styles";
import { SearchFilters, VolumeInfo } from "../../types";
import Spinner from "../../components/spinner";

const Search: React.FC = () => {
  const {
    volumes,
    filters,
    setSuggestions,
    setLoading,
    setFilters,
    resetFilters,
  } = useStore((state) => state);

  useEffect(() => {
    setSuggestions([]);
    setLoading(true);
  }, []);

  const getVolumeImage = (volumeInfo: VolumeInfo) => {
    if (!volumeInfo) return;

    return (
      volumeInfo?.imageLinks?.thumbnail ||
      volumeInfo?.imageLinks?.smallThumbnail
    );
  };

  const applyFilters = (label: string, value: unknown) => {
    setFilters(label as keyof SearchFilters, value);
  };

  return (
    <>
      <S.Container>
        <S.Content>
          <Filters
            dispatch={applyFilters}
            filters={filters}
            mainTitle="Filtrar resultados"
            hasSelectedFilters={true}
            resetFilters={resetFilters}
          />
          {volumes.length ? (
            <S.ContentResults>
              {volumes.map(({ id, volumeInfo }) => (
                <S.ContentResultsWrapper key={id}>
                  <S.ContentResultsCover>
                    <img
                      src={getVolumeImage(volumeInfo)}
                      alt={volumeInfo?.title}
                      loading="lazy"
                    />
                  </S.ContentResultsCover>
                  <S.ContentResultsTitle>
                    <label>{volumeInfo?.title} </label>
                  </S.ContentResultsTitle>
                  <S.ContentResultsCategory>
                    <span>{volumeInfo?.authors?.join(", ")}</span>
                  </S.ContentResultsCategory>
                </S.ContentResultsWrapper>
              ))}
            </S.ContentResults>
          ) : (
            <>
              <Spinner />
              <h2>Carregando...</h2>
            </>
          )}
        </S.Content>
      </S.Container>
      <Footer
        text={footerAllrightsReserved}
        privacyText={privacyAndPolicy}
        termsAndUsageText={termsAndUsage}
        helpText={helpLink}
      />
    </>
  );
};

export default Search;
